class UserError extends Error {
  constructor(status, userErrorMessage) {
    super(userErrorMessage);
    this.status = status;
    this.userErrorMessage = userErrorMessage;
  }
}

export default UserError;
