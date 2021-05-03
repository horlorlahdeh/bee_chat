import AsyncStorage from '@react-native-community/async-storage';


export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('refresh_token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
    console.error(e);
  }
};
export const removeToken = async (value) => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    // saving error
    console.error(e);
  }
};


export const storeRefreshToken = async (value) => {
    try {
        await AsyncStorage.setItem('refresh_token', value)
        if(value !== null) {
            return value
        }
    } catch (e) {
        console.error(e)
    }
}
export const getRefreshToken = async () => {
    try {
        const value = await AsyncStorage.getItem('refresh_token')
        if(value !== null) {
            return value
        }
    } catch (e) {
        console.error(e)
    }
}
export const removeRefreshToken = async () => {
    try {
        const value = await AsyncStorage.removeItem('refresh_token')
        if(value !== null) {
            return value
        }
    } catch (e) {
        console.error(e)
    }
}