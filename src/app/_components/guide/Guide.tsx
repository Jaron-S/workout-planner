"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

const content = {
  strength: (
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>
        <b>Intensity Focus:</b> Emphasize lifting heavier weights, typically
        around 75-85% of your 1RM.
      </li>
      <li>
        <b>Low Repetitions:</b> Aim for 3-5 reps per set.
      </li>
      <li>
        <b>Moderate Volume:</b> Target 9-25 sets per week for each muscle group.
      </li>
      <li>
        <b>Adequate Rest:</b> Longer rest periods between sets, usually 3-5
        minutes.
      </li>
      <li>
        <b>Compound Movements:</b> Prioritize exercises like bench presses,
        overhead presses, Romanian deadlifts, and pull-ups.
      </li>
      <li>
        <b>Progressive Overload:</b> Gradually increase weight or resistance.
      </li>
      <li>
        <b>Frequency:</b> Train each muscle group 2-3 times per week.
      </li>
      <li>
        <b>Periodic Deloading:</b> Every 4-6 weeks, reduce workout intensity or
        volume to allow the body to recover and prevent overtraining.
      </li>
    </ul>
  ),
  hypertrophy: (
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>
        <b>Moderate Intensity:</b> Use weights about 60-75% of your 1RM.
      </li>
      <li>
        <b>Higher Repetitions:</b> Perform 8-12 reps per set.
      </li>
      <li>
        <b>Increased Volume:</b> Aim for 15-20 sets per week per muscle group.
        Additional sets for smaller muscles.
      </li>
      <li>
        <b>Shorter Rest Periods:</b> Rest for 30 seconds to 2 minutes between
        sets.
      </li>
      <li>
        <b>Variety of Exercises:</b> Include both compound and isolation
        exercises.
      </li>
      <li>
        <b>Mind-Muscle Connection:</b> Focus on muscle contraction and form.
      </li>
      <li>
        <b>Frequency:</b> Work each muscle group 2-4 times per week.
      </li>
      <li>
        <b>Periodic Deloading:</b> Every 4-6 weeks, reduce workout intensity or
        volume to allow the body to recover and prevent overtraining.
      </li>
    </ul>
  ),
  strength_hypertrophy: (
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>
        <b>Blend Intensity Levels:</b> Incorporate both heavy lifting (70-85%
        1RM for strength) and moderate weights (60-75% 1RM for hypertrophy).
      </li>
      <li>
        <b>Varied Repetitions:</b> Utilize low reps (3-8 for strength) and
        higher reps (5-15 for hypertrophy) in your routine.
      </li>
      <li>
        <b>Adjusted Volume:</b> Target 10-20 sets per week for each major muscle
        group, balancing both strength and hypertrophy training demands.
      </li>
      <li>
        <b>Strategic Rest Periods:</b> Longer rests (3-5 minutes) for heavy,
        strength-focused sets and shorter rests (1-2 minutes) for hypertrophy
        sets.
      </li>
      <li>
        <b>Diverse Exercise Selection:</b> Combine compound movements like
        squats and deadlifts with isolation exercises for comprehensive muscle
        development.
      </li>
      <li>
        <b>Periodization:</b> Implement cycles of strength and hypertrophy
        phases, or blend both in each session.
      </li>
      <li>
        <b>Regular Frequency:</b> Train each muscle group 2-3 times per week,
        ensuring a mix of strength and hypertrophy stimuli.
      </li>
      <li>
        <b>Progressive Overload:</b> Continually increase the challenge by
        adding weight, reps, or sets over time.
      </li>
      <li>
        <b>Periodic Deloading:</b> Every 4-6 weeks, reduce workout intensity or
        volume to allow the body to recover and prevent overtraining.
      </li>
    </ul>
  ),
  minimalist: (
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>
        <b>Intensity Focus:</b> Prioritize high intensity, around 70-85% of 1RM
        for strength and hypertrophy.
      </li>
      <li>
        <b>Repetitions:</b> Perform 6-12 reps per set, depending on the exercise
        and muscle group.
      </li>
      <li>
        <b>Reduced Volume:</b> Target around 1-5 sets per muscle group or
        exercise per week. Significant strength and hypertrophy gains are
        achievable even at this lower volume.
      </li>
      <li>
        <b>Quality Work:</b> Focus on taking sets to near-failure or failure,
        maintaining good form.
      </li>
      <li>
        <b>Exercise Selection:</b> Emphasize compound movements for efficient
        targeting of multiple muscle groups.
      </li>
      <li>
        <b>Frequency:</b> Train each muscle group 1-2 times per week, depending
        on recovery and individual schedule.
      </li>
      <li>
        <b>Progressive Overload:</b> Continually challenge muscles by gradually
        increasing weight or resistance within this minimalistic framework.
      </li>
    </ul>
  ),
  beginner: (
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>
        <b>Sustainability & Consistency:</b> Focus on building a sustainable
        workout habit rather than optimizing for intensity or volume.
      </li>
      <li>
        <b>Low Volume Start:</b> Beginners can make significant progress with
        low weekly volume. Starting slow helps in building endurance and
        prevents early burnout.
      </li>
      <li>
        <b>Exercise Selection:</b> Start with basic compound movements to build
        foundational strength and improve overall fitness.
      </li>
      <li>
        <b>Focus on Form:</b> Prioritize proper form and technique over lifting
        heavier weights for the best long-term results and to prevent injury.
        Finish each set with 2-4 reps remaining before failure. Pushing closer
        to the point of failure does not lead to faster results and may
        reinforce bad habits if your form breaks down.
      </li>
      <li>
        <b>Regular Frequency:</b> Aim for 2-3 workout sessions per week to
        maintain a balance between exercise and recovery. Full-body workouts can
        be helpful to ensure every muscle group is still targetted at least 1-2
        times per week in case you miss a workout.
      </li>
      <li>
        <b>Tracking Progress:</b> Keep a simple log of workouts to monitor
        progress and stay motivated.
      </li>
      <li>
        <b>Progressive Adaptation:</b> Gradually increase workout volume and
        intensity as comfort and fitness levels improve.
      </li>
      <li>
        <b>Patient Mindset:</b> Understand that progress takes time and the
        importance of patience in the fitness journey. Once you&apos;ve into a
        groove, your weight should increase by about 3-5% each week.
      </li>
    </ul>
  ),
};

const Guide = () => {
  return (
    <div className="w-full px-32 pt-4">
      <h2 className="text-3xl font-bold">Routine Design Guide</h2>

      <span className="text-tiny text-default-500 mb-8">
        Please note: This app is designed to give generalized advice and can not
        guarantee 100% accuracy for every individual.
      </span>

      <Accordion className="py-4">
        <AccordionItem
          key="1"
          aria-label="Strength & Hypertrophy Training"
          subtitle="Press to expand"
          title="Strength & Hypertrophy Training"
        >
          {content.strength_hypertrophy}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Strength Training"
          subtitle="Press to expand"
          title="Strength Training"
        >
          {content.strength}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Hypertrophy Training"
          subtitle="Press to expand"
          title="Hypertrophy Training"
        >
          {content.hypertrophy}
        </AccordionItem>
        {/* <AccordionItem
          key="4"
          aria-label="Minimalist Training"
          subtitle="Press to expand"
          title="Minimalist Training"
        >
          {content.minimalist}
        </AccordionItem> */}
        <AccordionItem
          key="5"
          aria-label="Beginner Training"
          subtitle="Press to expand"
          title="Beginner Training"
        >
          {content.beginner}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Guide;
