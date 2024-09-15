"use client"

import React, { useState } from "react";
import { Tooltip, Button, Input, Select, SelectItem, Card, CardHeader, CardFooter, CardBody, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'Male' | 'Female' | undefined>(undefined);
  const [age, setAge] = useState<string>('');
  const [units, setUnits] = useState<'Metric' | 'Imperial' | undefined>(undefined);
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
  const [bfMethod1, setBfMethod1] = useState<string | null>(null);
  const [bfMethod2, setBfMethod2] = useState<string | null>(null);
  const [bfCovertBailey, setBfCovertBailey] = useState<string | null>(null);
  const [bfAverage, setBfAverage] = useState<string | null>(null);
  const [ffmi, setFfmi] = useState<string | null>(null);
  const [ffmiAdjusted, setFfmiAdjusted] = useState<string | null>(null);

  const calculateBodyFat = () => {
    if (!gender || !units) {
      alert('Please select Gender and Units.');
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const f = parseFloat(forearm);
    const wa = parseFloat(waist);
    const ab = parseFloat(abdomen);
    const hi = parseFloat(hip);
    const wr = parseFloat(wrist);

    if (
      isNaN(w) ||
      isNaN(h) ||
      isNaN(n) ||
      (gender === 'Male' && isNaN(ab)) ||
      (gender === 'Female' && (isNaN(wa) || isNaN(hi) || isNaN(wr)))
    ) {
      alert('Please enter all required measurements.');
      return;
    }

    let bf1 = 0;
    let bf2: number | null = null;
    let bfCovert = 0;

    let weight_kg = w;
    let height_cm = h;
    let neck_cm = n;
    let waist_cm = wa;
    let abdomen_cm = ab;
    let hip_cm = hi;
    let wrist_cm = wr;

    if (units === 'Imperial') {
      weight_kg = w * 0.453592;
      height_cm = h * 2.54;
      neck_cm = n * 2.54;
      waist_cm = wa * 2.54;
      abdomen_cm = ab * 2.54;
      hip_cm = hi * 2.54;
      wrist_cm = wr * 2.54;
    }

    if (gender === 'Male') {
      bf1 = 495 / (1.0324 - 0.19077 * Math.log10(abdomen_cm - neck_cm) + 0.15456 * Math.log10(height_cm)) - 450;
    } else {
      bf1 = 495 / (1.29579 - 0.35004 * Math.log10(waist_cm + hip_cm - neck_cm) + 0.221 * Math.log10(height_cm)) - 450;
    }

    if (gender === 'Female') {
      bf2 = 163.205 * Math.log10(waist_cm + hip_cm - neck_cm) - 97.684 * Math.log10(height_cm) - 78.387;
    }

    const weight_lbs = w * (units === 'Metric' ? 2.20462 : 1);
    const waist_in = wa * (units === 'Metric' ? 0.393701 : 1);
    const wrist_in = wr * (units === 'Metric' ? 0.393701 : 1);
    const hip_in = hi * (units === 'Metric' ? 0.393701 : 1);
    const forearm_in = f * (units === 'Metric' ? 0.393701 : 1);

    if (gender === 'Male') {
      const A1 = weight_lbs * 1.082 + 94.42;
      const A2 = waist_in * 4.15;
      const leanBodyMass = A1 - A2;
      bfCovert = ((weight_lbs - leanBodyMass) / weight_lbs) * 100;
    } else {
      const A1 = weight_lbs * 0.732 + 8.987;
      const A2 = wrist_in / 3.14;
      const A3 = waist_in * 0.157;
      const A4 = hip_in * 0.249;
      const A5 = forearm_in * 0.434;
      const leanBodyMass = A1 + A2 - A3 - A4 + A5;
      bfCovert = ((weight_lbs - leanBodyMass) / weight_lbs) * 100;
    }

    const results = [bf1];
    if (bf2 !== null) results.push(bf2);
    results.push(bfCovert);

    const averageBf = results.reduce((sum, val) => sum + val, 0) / results.length;

    setBfMethod1(bf1.toFixed(2));
    setBfMethod2(bf2 !== null ? bf2.toFixed(2) : null);
    setBfCovertBailey(bfCovert.toFixed(2));
    setBfAverage(averageBf.toFixed(2));

    // Compute Lean Body Mass
    const leanMass = weight_kg * (1 - averageBf / 100);

    // Compute height in meters
    const height_meters = height_cm / 100;

    if (height_meters <= 0) {
      alert('Invalid height.');
      return;
    }

    if (weight_kg <= 0) {
      alert('Invalid weight.');
      return;
    }

    // Compute FFMI
    const ffmiValue = leanMass / (height_meters * height_meters);

    // Adjust FFMI to 1.8 m standard height
    const ffmiAdjustedValue = ffmiValue + 6.1 * (1.8 - height_meters);

    setFfmi(ffmiValue.toFixed(2));
    setFfmiAdjusted(ffmiAdjustedValue.toFixed(2));
  };

  return (
    <div>
      <Card className="m-4 px-4 pb-4 gap-2 flex justify-center">
        <CardHeader className="flex-col items-start md:max-w-196">
          <h2 className="">Body Fat Calculator</h2>
        </CardHeader>

        <CardBody className="gap-2 flex justify-center">
          <Select
            label="Sex"
            placeholder="Select your sex"
            selectedKeys={gender ? [gender] : []}
            onSelectionChange={(keys) => setGender(Array.from(keys)[0] as 'Male' | 'Female')}
          >
            <SelectItem key="Male">Male</SelectItem>
            <SelectItem key="Female">Female</SelectItem>
          </Select>

          <Input
            label="Age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <Select
            label="Units"
            placeholder="Select units"
            selectedKeys={units ? [units] : []}
            onSelectionChange={(keys) => setUnits(Array.from(keys)[0] as 'Metric' | 'Imperial')}
          >
            <SelectItem key="Metric">Metric</SelectItem>
            <SelectItem key="Imperial">Imperial</SelectItem>
          </Select>

          <Input
            label={`Weight (${units === 'Metric' ? 'kg' : 'lbs'})`}
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            startContent={
              <Tooltip content="Enter your weight.">
                <Icon icon={"material-symbols:info"} />
              </Tooltip>
            }
          />

          <Input
            label={`Height (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            startContent={
              <Tooltip content="Enter your height.">
                <Icon icon={"material-symbols:info"} />
              </Tooltip>
            }
          />

          <Input
            label={`Neck (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your neck circumference"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            startContent={
              <Tooltip content="Measure around the narrowest part of your neck.">
                <Icon icon={"material-symbols:info"} />
              </Tooltip>
            }
          />

          {gender === 'Female' && (
            <>
              <Input
                label={`Forearm (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your forearm circumference"
                value={forearm}
                onChange={(e) => setForearm(e.target.value)}
                startContent={
                  <Tooltip content="Measure around the largest part of your forearm.">
                    <Icon icon={"material-symbols:info"} />
                  </Tooltip>
                }
              />

              <Input
                label={`Hip (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your hip circumference"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                startContent={
                  <Tooltip content="Measure around the widest part of your hips.">
                    <Icon icon={"material-symbols:info"} />
                  </Tooltip>
                }
              />

              <Input
                label={`Thigh (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your thigh circumference"
                value={thigh}
                onChange={(e) => setThigh(e.target.value)}
                startContent={
                  <Tooltip content="Measure around the thickest part of your thigh.">
                    <Icon icon={"material-symbols:info"} />
                  </Tooltip>
                }
              />

              <Input
                label={`Calf (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your calf circumference"
                value={calf}
                onChange={(e) => setCalf(e.target.value)}
                startContent={
                  <Tooltip content="Measure around the thickest part of your calf.">
                    <Icon icon={"material-symbols:info"} />
                  </Tooltip>
                }
              />

              <Input
                label={`Wrist (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
                placeholder="Enter your wrist circumference"
                value={wrist}
                onChange={(e) => setWrist(e.target.value)}
                startContent={
                  <Tooltip content="Measure around the narrowest part of your wrist.">
                    <Icon icon={"material-symbols:info"} />
                  </Tooltip>
                }
              />
            </>
          )}

          <Input
            label={`Waist (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            placeholder="Enter your waist circumference"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            startContent={
              <Tooltip content="Measure around the narrowest part of your waist.">
                <Icon icon={"material-symbols:info"} />
              </Tooltip>
            }
          />

          {gender === 'Male' && (
            <Input
              label={`Abdomen (${units === 'Metric' ? 'cm' : 'inches'})`}
              type="number"
              placeholder="Enter your abdomen circumference"
              value={abdomen}
              onChange={(e) => setAbdomen(e.target.value)}
              startContent={
                <Tooltip content="Measure around the widest part of your abdomen at the belly button.">
                  <Icon icon={"material-symbols:info"} />
                </Tooltip>
              }
            />
          )}

          <Button className="w-24" onClick={calculateBodyFat}>
            Calculate
          </Button>
        </CardBody>

        <CardFooter>
          {(bfMethod1 || bfMethod2 || bfCovertBailey) && (
            <div className='flex flex-col'>
              <h3 className='text-xl font-bold mb-2'>Results:</h3>
              {bfMethod1 && <p>U.S. Navy Circumference Method: {bfMethod1}%</p>}
              {bfMethod2 && <p>U.S. Navy Circumference Method #2: {bfMethod2}%</p>}
              {bfCovertBailey && <p>Covert Bailey: {bfCovertBailey}%</p>}
              {bfAverage && <p>Average: {bfAverage}%</p>}
              <Divider className="my-2"/>
              {ffmi && <p>FFMI: {ffmi}</p>}
              {ffmiAdjusted && <p>Normalized FFMI: {ffmiAdjusted}</p>}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BodyFatCalculator;
