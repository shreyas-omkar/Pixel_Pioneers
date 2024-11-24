import axios from 'axios'
import { create } from 'zustand'
import toast from 'react-hot-toast'


const SERVER_URL = 'http://localhost:5000/user'

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,

    registerUser: async (values, formik, navigate) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${SERVER_URL}/register`, values, { withCredentials: true })
            if (res) {
                set({ user: res.data.user, isAuthenticated: true, isLoading: false })
                formik.resetForm()
                await toast.success('User registered successfully! Please verify your email.');
                navigate('/verify_email');
            } else {
                toast.error('Failed to register user! Please try again.');
            }
        } catch (error) {
            set({ error: error.response.data.msg || "Error Registering The User", isLoading: false })
            toast.error('An error occurred during registration.');
        }
    },

    loginUser: async (values, navigate, formik) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${SERVER_URL}/login`, values, { withCredentials: true })
            if (res) {
                set({ user: res.data.user, isAuthenticated: true, isLoading: false })
                formik.resetForm()
                await toast.success('Logged in successfully!');
                navigate('/');
            } else {
                toast.error('Failed to log in! Please try again.');
            }
        } catch (error) {
            set({ error: error.response.data.msg || "Error Logging In", isLoading: false })
            toast.error('An error occurred during login.');
        }
    },

    forgotPassword: async (values, navigate, formik) => {
      set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${SERVER_URL}/forgotPassword`, values)
            if (res) {
                set({ isLoading: false })
                formik.resetForm()
                toast.success('Reset Password Link Sent To Your Email.');
                navigate('/email_sent');
            } else {
                toast.error('Failed to reset password!');
            }
        } catch (err) {
            console.log(err)
            toast.error('An error occurred during password reset.');
        }
    },
    resetPassword: async (password, token, navigate, formik) => {
        // Set loading state and clear any previous errors
        set({ isLoading: true, error: null });
        try {
            // Wrap the password in an object for the request body
            const res = await axios.post(`${SERVER_URL}/resetPassword/${token}`, { newPassword: password });
    
            // Check if the response indicates success
            if (res.status === 200) { // Make sure to check the response status
                set({ isLoading: false }); // Set loading to false on success
                formik.resetForm(); // Reset the form
                toast.success('Password reset successfully!'); // Show success message
                navigate('/login'); // Redirect to login page
            } else {
                // Handle cases where the response is not 200
                set({ isLoading: false }); // Set loading to false on failure
                toast.error('Failed to reset password!'); // Show error message
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            set({ isLoading: false }); // Set loading to false on error
            toast.error('An error occurred during password reset.'); // Show error message
        }
    },
    

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const res = await axios.get(`${SERVER_URL}/checkAuth`, { withCredentials: true });
    
            if (res && res.data) { // Ensure res.data exists
                set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
            } else {
                set({ user: null, isAuthenticated: false, isCheckingAuth: false });
            }
        } catch (error) {
            console.error("Error during authentication:", error); // Log the error for debugging
    
            // Check if error.response exists and has the expected structure
            if (error.response) {
                set({ error: error.response.data.msg || "Error Checking Authentication", isCheckingAuth: false });
            } else {
                set({ error: "Network Error or Server Unreachable", isCheckingAuth: false }); // Handle network errors
            }
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${SERVER_URL}/logout`, null, { withCredentials: true });
            set({ user: null, isAuthenticated: false, isLoading: false });
            toast.success('Logged out successfully!');
        } catch (error) {
            console.error("Error during logout:", error);
            set({ error: "Failed to log out", isLoading: false });
        }
    }
    
}))