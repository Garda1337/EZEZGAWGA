<script>
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Zablokuj domyślną mini-belkę przeglądarki
    deferredPrompt = event;
    showInstallButton();
  });

  function showInstallButton() {
    const installButton = document.getElementById('install-button');
    if (!installButton) return;

    installButton.style.display = 'block';

    installButton.addEventListener('click', async () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('Użytkownik zaakceptował instalację');
      } else {
        console.log('Użytkownik anulował instalację');
      }

      deferredPrompt = null; // Wyczyść obiekt prompt po użyciu
    });
  }
</script>
