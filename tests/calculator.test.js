import{test}from'node:test';import assert from'node:assert/strict';import{trainingTime,durationLabel}from'../src/calculator.js';
test('four-hour week saves 105 minutes, 420 over four weeks',()=>{assert.equal(trainingTime(4).difference,105);assert.equal(trainingTime(4).fourWeekDifference,420);assert.equal(durationLabel(105),'1 time 45 min')});
test('starting, equal and shorter weeks preserve signed comparison',()=>{assert.equal(trainingTime(0).difference,-135);assert.equal(trainingTime(2.25).difference,0);assert.equal(trainingTime(1.5).difference,-45);assert.equal(trainingTime(12).difference,585)});
test('reject invalid hours',()=>{for(const n of [-1,13,NaN])assert.throws(()=>trainingTime(n),RangeError)});
