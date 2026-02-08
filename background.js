function togglePiP() {

// Obtém o primeiro elemento <video> da página ativa
  const video = document.querySelector('video');

// Se não houver vídeo na página, encerra a execução
  if (!video) {
    alert('Nenhum vídeo encontrado');
    return;
  }

// Alterna entre entrar e sair do modo PiP
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}

// Injeta e executa a função togglePiP no contexto da aba ativa
function runPiP(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: togglePiP
  });
}

// Disparo via clique no ícone da extensão
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) runPiP(tab.id);
});

// Disparo via atalho de teclado configurado no Chrome
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-pip') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) runPiP(tabs[0].id);
    });
  }
});
