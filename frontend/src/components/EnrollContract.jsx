export const signData = async (courseId) => {
  const message = `Enroll in course ${courseId}`;

  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const from = accounts[0];

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, from],
      });

      console.log('Signature:', signature);
      return signature;
    } catch (error) {
      console.error("Error requesting accounts or signing message:", error);
      throw error;
    }
  } else {
    alert("Please install MetaMask to sign the message.");
  }
};
