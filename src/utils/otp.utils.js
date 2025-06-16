export async function createOTP(minRange, maxRange, expirationTimeMin) {
  const otp = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

  const expireAt = Date.now() + expirationTimeMin * 60000;

  return {
    otp: otp,
    expireAt: new Date(expireAt),
  };
}
