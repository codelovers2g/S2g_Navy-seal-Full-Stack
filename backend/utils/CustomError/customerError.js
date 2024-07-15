import { validationResult } from "express-validator";
const customError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const ErrorBucket = {};
    const ErrorList = errors.mapped();
    for (let error in ErrorList) {
      ErrorBucket[error] = ErrorList[error].msg;
    }
    return res.status(400).json({ errors: ErrorBucket });
  }
  next();
};
export default customError;
