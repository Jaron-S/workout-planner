"use client"

import React, { useState } from "react";
import { Tooltip, Button, Input, Select, SelectItem, Card, CardHeader, CardFooter, CardBody } from "@nextui-org/react";
import { Icon } from '@iconify/react';

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

  return (
    <div>
      <Card className="m-4 px-4 pb-4 gap-2 flex justify-center">
        <CardHeader className="flex-col items-start md:max-w-196">
          <h2 className="">Body Fat Calculator</h2>
        </CardHeader>

        <CardBody className="gap-2 flex justify-center">
          {/* Gender Selection */}
          <Select label="Sex" selectedKeys={gender ? [gender] : []} onSelectionChange={(keys) => setGender(Array.from(keys)[0] as 'Male' | 'Female')}>
            <SelectItem key="Male">Male</SelectItem>
            <SelectItem key="Female">Female</SelectItem>
          </Select>

          {/* Age Input */}
          <Input
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          {/* Units Selection */}
          <Select label="Units" selectedKeys={units ? [units] : []} onSelectionChange={(keys) => setUnits(Array.from(keys)[0] as 'Metric' | 'Imperial')}>
            <SelectItem key="Metric">Metric</SelectItem>
            <SelectItem key="Imperial">Imperial</SelectItem>
          </Select>

          {/* Weight Input */}
          <Input
            label={`Weight (${units === 'Metric' ? 'kg' : 'lbs'})`}
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {/* Height Input */}
          <Input
            label={`Height (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          {/* Neck Input */}
          <Input
            label={`Neck (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            startContent={
              <Tooltip content="Measure around the narrowest part of your neck.">
                <Icon icon={"material-symbols:info"} />
              </Tooltip>
            }
          />

          {/* Female-specific inputs */}
          {gender === 'Female' && (
            <>
              <Input
                label={`Forearm (${units === 'Metric' ? 'cm' : 'inches'})`}
                type="number"
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

          {/* Waist Input */}
          <Input
            label={`Waist (${units === 'Metric' ? 'cm' : 'inches'})`}
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            startContent={
              <Tooltip content="Measure around the narrowest part of your waist.">
                <Icon icon={"material-symbols:info"} />
              </Tooltip>
            }
          />

          {/* Abdomen Input for Males */}
          {gender === 'Male' && (
            <Input
              label={`Abdomen (${units === 'Metric' ? 'cm' : 'inches'})`}
              type="number"
              value={abdomen}
              onChange={(e) => setAbdomen(e.target.value)}
              startContent={
                <Tooltip content="Measure around the widest part of your abdomen at the belly button.">
                  <Icon icon={"material-symbols:info"} />
                </Tooltip>
              }
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default BodyFatCalculator;
