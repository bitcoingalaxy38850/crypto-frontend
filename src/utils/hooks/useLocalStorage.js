import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/features/UserSlice";

function useLocalStorage(key) {
  const initialValue = null;
  const dispatch = useDispatch();

  // Retrieve the stored value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get item from localStorage
      const item = window.localStorage.getItem(key);

      // If no item is found, return initial value
      if (!item) return initialValue;

      // Parse item and return it
      const parsedItem = JSON.parse(item);
      return parsedItem.user_id;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Function to store the value in localStorage
  const setValue = (value) => {
    try {
      // Save the user ID in localStorage without expiry
      const item = {
        user_id: value,
      };

      // Store it in localStorage
      window.localStorage.setItem(key, JSON.stringify(item));

      // Update state
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to remove the value (i.e., logging out the user)
  const removeValue = () => {
    try {
      // Remove item from localStorage
      window.localStorage.removeItem(key);

      // Update state to initial value
      setStoredValue(initialValue);

      // Dispatch redux action to remove user
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
