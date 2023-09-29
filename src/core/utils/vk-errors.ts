export const mapVkError = (error: any) => {
  const type: 'client_error' | 'api_error' | 'auth_error' = error.error_type;
  const data = error.error_data;

  if (type === 'client_error') {
    return `Code: ${data.error_code}, Reason: ${data.error_reason}, Desc: ${data.error_description}`;
  }

  if (type === 'api_error') {
    return `Code: ${data.error_code}, Mssg: ${data.error_msg}`;
  }

  if (type === 'auth_error') {
    return `Code: ${data.error}, Reason: ${data.error_reason}, Desc: ${data.error_description}`;
  }

  return `Unknown vk error ${JSON.stringify(error, ['message', 'statusCode'])}`;
};
