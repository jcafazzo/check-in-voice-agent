import Vapi from 'https://esm.sh/@vapi-ai/web@latest';

const vapi = new Vapi('e05cfe87-84b3-41df-a3e0-411438ab6cc7');

document.addEventListener('DOMContentLoaded', () => {
    const toggleCallButton = document.getElementById('toggleCall');
    const statusDiv = document.getElementById('status');

    let isCallActive = false;

    toggleCallButton.addEventListener('click', async () => {
        if (isCallActive) {
            vapi.stop();
            toggleCallButton.textContent = 'Start Call';
            statusDiv.textContent = 'Call ended';
        } else {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                await vapi.start('99511b5f-5c29-4650-b80a-3a06bd3cc139');
                toggleCallButton.textContent = 'Stop Call';
                statusDiv.textContent = 'Call started';
            } catch (error) {
                console.error('Error:', error);
                statusDiv.textContent = 'Error: ' + error.message;
            }
        }
        isCallActive = !isCallActive;
    });

    vapi.on('speech-start', () => {
        statusDiv.textContent = 'Assistant is speaking...';
    });

    vapi.on('speech-end', () => {
        statusDiv.textContent = 'Assistant finished speaking';
    });

    vapi.on('error', (error) => {
        console.error('Vapi error:', error);
        statusDiv.textContent = 'Error occurred: ' + error.message;
    });
});