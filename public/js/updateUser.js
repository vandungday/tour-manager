import axios from 'axios';
import { showAlert } from './alert';

export const updateUser = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/v1/users/update-my-password'
        : 'http://localhost:3000/api/v1/users/me';

    const result = await axios({
      method: 'PATCH',
      url: url,
      data: data,
    });

    if (result.data.status === 'success') {
      showAlert('success', 'Updated successfully!');
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
