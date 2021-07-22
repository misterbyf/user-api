import httpStatus from 'http-status-codes';

export default function middlewareFileError() {
  return (req, res, next) => {
    if (req.file != null) {
      return next();
    }

    return res
      .status(httpStatus.BAD_REQUEST)
      .json({
        message: 'Select file!'
      });
  };
}