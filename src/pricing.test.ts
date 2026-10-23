import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRentalPrice } from './pricing';

test('9-seater pricing matches specification', () => {
  // SG - Vũng Tàu
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '9', seatType: 'chair', duration: 'day', quantity: 1 }).unitPrice, 2_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '9', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 4_500_000);
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '9', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 8_000_000);

  // SG - Phan Thiết
  assert.equal(calculateRentalPrice({ route: 'sg-pt', vehicleType: '9', seatType: 'chair', duration: 'day', quantity: 1 }).unitPrice, 3_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-pt', vehicleType: '9', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 6_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-pt', vehicleType: '9', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 8_000_000);

  // SG - Đà Lạt
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '9', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 8_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '9', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 12_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '9', seatType: 'chair', duration: '4d3n', quantity: 1 }).unitPrice, 14_000_000);

  // 9-seat sleeper is invalid
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '9', seatType: 'sleeper', duration: 'day', quantity: 1 }).isValid, false);
});

test('16-seater pricing matches specification with sleeper surcharge (+2m)', () => {
  // SG - Vũng Tàu Chair
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '16', seatType: 'chair', duration: 'day', quantity: 1 }).unitPrice, 3_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '16', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 4_500_000);
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '16', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 5_000_000);

  // SG - Vũng Tàu Sleeper (+2m)
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '16', seatType: 'sleeper', duration: 'day', quantity: 1 }).unitPrice, 5_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-vt', vehicleType: '16', seatType: 'sleeper', duration: '2d1n', quantity: 1 }).unitPrice, 6_500_000);

  // SG - Phan Thiết
  assert.equal(calculateRentalPrice({ route: 'sg-pt', vehicleType: '16', seatType: 'chair', duration: 'day', quantity: 1 }).unitPrice, 3_500_000);
  assert.equal(calculateRentalPrice({ route: 'sg-pt', vehicleType: '16', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 5_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-pt', vehicleType: '16', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 5_500_000);

  // SG - Đà Lạt
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '16', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 6_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '16', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 8_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '16', seatType: 'chair', duration: '4d3n', quantity: 1 }).unitPrice, 11_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '16', seatType: 'sleeper', duration: '4d3n', quantity: 1 }).unitPrice, 13_000_000);
});

test('34-seater and 45-seater pricing matches specification', () => {
  // 34-seater Đà Lạt
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '34', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 10_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '34', seatType: 'sleeper', duration: '2d1n', quantity: 1 }).unitPrice, 15_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '34', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 13_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '34', seatType: 'sleeper', duration: '3d2n', quantity: 1 }).unitPrice, 19_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '34', seatType: 'chair', duration: '4d3n', quantity: 1 }).unitPrice, 18_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '34', seatType: 'sleeper', duration: '4d3n', quantity: 1 }).unitPrice, 21_000_000);

  // 45-seater Đà Lạt
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'chair', duration: '2d1n', quantity: 1 }).unitPrice, 10_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'sleeper', duration: '2d1n', quantity: 1 }).unitPrice, 13_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'chair', duration: '3d2n', quantity: 1 }).unitPrice, 13_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'sleeper', duration: '3d2n', quantity: 1 }).unitPrice, 15_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'chair', duration: '4d3n', quantity: 1 }).unitPrice, 16_000_000);
  assert.equal(calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'sleeper', duration: '4d3n', quantity: 1 }).unitPrice, 19_000_000);
});

test('Multi-vehicle quantity multiplier and other options', () => {
  // 3 vehicles of 45-seat 2d1n Dalat (Ghế)
  const res = calculateRentalPrice({ route: 'sg-dl', vehicleType: '45', seatType: 'chair', duration: '2d1n', quantity: 3 });
  assert.equal(res.unitPrice, 10_000_000);
  assert.equal(res.totalPrice, 30_000_000);

  // Duration 'other'
  const otherRes = calculateRentalPrice({ route: 'sg-vt', vehicleType: '16', seatType: 'chair', duration: 'other', quantity: 2 });
  assert.equal(otherRes.isValid, false);
  assert.match(otherRes.formattedTotalPrice, /1900 996646/);
});
