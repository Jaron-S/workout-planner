"use client";

import React, { useState } from 'react';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
} from '@nextui-org/react';

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'Male' | 'Female' | undefined>(undefined);
  const [age, setAge] = useState<string>('');
  const [units, setUnits] = useState<'Metric' | 'Imperial' | undefined>(undefined);

  // Measurements
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [forearm, setForearm] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [abdomen, setAbdomen] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [thigh, setThigh] = useState<string>('');
  const [calf, setCalf] = useState<string>('');
  const [wrist, setWrist] = useState<string>('');

  // Results
  const [bfMethod1, setBfMethod1] = useState<string | null>(null);
  const [bfMethod2, setBfMethod2] = useState<string | null>(null);
  const [bfCovertBailey, setBfCovertBailey] = useState<string | null>(null);
  const [bfAverage, setBfAverage] = useState<string | null>(null);

  const calculateBodyFat = () => {
    if (!gender || !units) {
      alert('Please select Gender and Units.');
      return;
    }

    // Convert inputs to numbers
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const f = parseFloat(forearm);
    const wa = parseFloat(waist);
    const ab = parseFloat(abdomen);
    const hi = parseFloat(hip);
    const th = parseFloat(thigh);
    const ca = parseFloat(calf);
    const wr = parseFloat(wrist);

    // Validate required inputs
    if (
      isNaN(w) ||
      isNaN(h) ||
      isNaN(n) ||
      isNaN(wa) ||
      isNaN(ab) ||
      (gender === 'Female' && (isNaN(hi) || isNaN(wr)))
    ) {
      alert('Please enter all required measurements.');
      return;
    }

    let bf1 = 0;
    let bf2: number | null = null;
    let bfCovert = 0;

    // Unit conversions for US Navy methods (always use metric units)
    let weight_kg = w;
    let height_cm = h;
    let neck_cm = n;
    let forearm_cm = f;
    let waist_cm = wa;
    let abdomen_cm = ab;
    let hip_cm = hi;
    let thigh_cm = th;
    let calf_cm = ca;
    let wrist_cm = wr;

    if (units === 'Imperial') {
      // Convert to metric units
      weight_kg = w * 0.453592;
      height_cm = h * 2.54;
      neck_cm = n * 2.54;
      forearm_cm = f * 2.54;
      waist_cm = wa * 2.54;
      abdomen_cm = ab * 2.54;
      hip_cm = hi * 2.54;
      thigh_cm = th * 2.54;
      calf_cm = ca * 2.54;
      wrist_cm = wr * 2.54;
    }

    // **U.S. Navy Circumference Method #1**

    if (gender === 'Male') {
      bf1 =
        495 /
          (1.0324 -
            0.19077 * Math.log10(abdomen_cm - neck_cm) +
            0.15456 * Math.log10(height_cm)) -
        450;
    } else {
      bf1 =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist_cm + hip_cm - neck_cm) +
            0.221 * Math.log10(height_cm)) -
        450;
    }

    // **U.S. Navy Circumference Method #2 (Women Only)**

    if (gender === 'Female') {
      bf2 =
        163.205 * Math.log10(waist_cm + hip_cm - neck_cm) -
        97.684 * Math.log10(height_cm) -
        78.387;
    }

    // **Covert Bailey's "Fit or Fat" Method**

    // Use imperial units (lbs and inches) for this method
    let weight_lbs = w;
    let waist_in = wa;
    let wrist_in = wr;
    let hip_in = hi;
    let forearm_in = f;

    if (units === 'Metric') {
      // Convert to imperial units
      weight_lbs = w * 2.20462;
      waist_in = wa * 0.393701;
      wrist_in = wr * 0.393701;
      hip_in = hi * 0.393701;
      forearm_in = f * 0.393701;
    }

    if (gender === 'Male') {
      // For men, uses weight and waist circumference
      if (isNaN(waist_in)) {
        alert("Please enter all required measurements for Covert Bailey's method.");
        return;
      }
      const A1 = weight_lbs * 1.082 + 94.42;
      const A2 = waist_in * 4.15;
      const leanBodyMass = A1 - A2;
      bfCovert = ((weight_lbs - leanBodyMass) / weight_lbs) * 100;
    } else {
      // For women, uses weight, wrist, waist, hip, and forearm
      if (
        isNaN(wrist_in) ||
        isNaN(waist_in) ||
        isNaN(hip_in) ||
        isNaN(forearm_in)
      ) {
        alert("Please enter all required measurements for Covert Bailey's method.");
        return;
      }
      const A1 = weight_lbs * 0.732 + 8.987;
      const A2 = wrist_in / 3.14;
      const A3 = waist_in * 0.157;
      const A4 = hip_in * 0.249;
      const A5 = forearm_in * 0.434;
      const leanBodyMass = A1 + A2 - A3 - A4 + A5;
      bfCovert = ((weight_lbs - leanBodyMass) / weight_lbs) * 100;
    }

    // **Calculate Average Body Fat Percentage**

    const results = [bf1];
    if (bf2 !== null) results.push(bf2);
    results.push(bfCovert);

    const averageBf =
      results.reduce((sum, val) => sum + val, 0) / results.length;

    // **Set Results**

    setBfMethod1(bf1.toFixed(2));
    setBfMethod2(bf2 !== null ? bf2.toFixed(2) : null);
    setBfCovertBailey(bfCovert.toFixed(2));
    setBfAverage(averageBf.toFixed(2));
  };

  return (
    <div>
      <Card className="m-4 px-4 pb-4 gap-2 flex justify-center">
        <CardHeader className="flex-col items-start md:max-w-196">
          <h2 className="">Body Fat Calculator</h2>
        </CardHeader>

        <CardBody className="gap-2 flex justify-center">
          {/* Gender Selection */}
          <Select
            label="Sex"
            placeholder="Select your sex"
            selectedKeys={gender ? [gender] : []}
            onSelectionChange={(keys) =>
              setGender(Array.from(keys)[0] as 'Male' | 'Female')
            }
          >
            <SelectItem key="Male">Male</SelectItem>
            <SelectItem key="Female">Female</SelectItem>
          </Select>
          {/* Age Input */}
          <Input
            label="Age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {/* Units Selection */}
          <Select
            label="Units"
            placeholder="Select units"
            selectedKeys={units ? [units] : []}
            onSelectionChange={(keys) =>
              setUnits(Array.from(keys)[0] as 'Metric' | 'Imperial')
            }
          >
            <SelectItem key="Metric">Metric</SelectItem>
            <SelectItem key="Imperial">Imperial</SelectItem>
          </Select>
          {/* Measurements */}
          <Input
            label={`Weight (${units === 'Metric' ? 'kg' : 'lbs'})`}
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Input
            label={`Height (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Input
            label={`Neck (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your neck circumference"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
          {gender === 'Female' && (
            <>
              <Input
                label={`Forearm (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your forearm circumference"
                value={forearm}
                onChange={(e) => setForearm(e.target.value)}
              />
            </>
          )}

          <Input
            label={`Waist (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your waist circumference"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
          <Input
            label={`Abdomen (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your abdomen circumference"
            value={abdomen}
            onChange={(e) => setAbdomen(e.target.value)}
          />
          {gender === 'Female' && (
            <>
              <Input
                label={`Hips (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your hip circumference"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
              />
              <Input
                label={`Thigh (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your thigh circumference"
                value={thigh}
                onChange={(e) => setThigh(e.target.value)}
              />
              <Input
                label={`Calf (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your calf circumference"
                value={calf}
                onChange={(e) => setCalf(e.target.value)}
              />
              <Input
                label={`Wrist (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your wrist circumference"
                value={wrist}
                onChange={(e) => setWrist(e.target.value)}
              />
            </>
          )}
          {/* Calculate Button */}
          <Button className="w-24" onClick={calculateBodyFat}>
            Calculate
          </Button>
        </CardBody>

        {/* Results */}
        <CardFooter>
          {(bfMethod1 || bfMethod2 || bfCovertBailey) && (
            <div className='flex flex-col'>
              <h3 className='text-lg font-bold'>Results:</h3>
              {bfMethod1 && (
                <p>
                  U.S. Navy Circumference Method: {bfMethod1}%
                </p>
              )}
              {bfMethod2 && (
                <p>
                   U.S. Navy Circumference Method:{bfMethod2}%
                </p>
              )}
              {bfCovertBailey && (
                <p>Covert Bailey: {bfCovertBailey}%</p>
              )}
              {bfAverage && <p>Average: {bfAverage}%</p>}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BodyFatCalculator;
