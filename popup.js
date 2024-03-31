document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('enabled');
  const optionsButton = document.getElementById('openOptions');
  const adClicksElement = document.getElementById('totalAdsClicked');

  console.log('hi');

  optionsButton.addEventListener('click', openOptionsPage);

  toggleSwitch.addEventListener('change', function() {
    chrome.storage.sync.set({'enabled': toggleSwitch.checked}, saveOptions);
  });

  // Load the current state
  chrome.storage.sync.get('enabled', function(data) {
    console.log('loaded enabled:', data.enabled);
    toggleSwitch.checked = data.enabled;
  });

  chrome.storage.sync.get('totalAdsClicked', function(data) {
    console.log('totalAdsClicked:', data.totalAdsClicked || 0);
    document.getElementById('totalAdsClicked').textContent = data.totalAdsClicked || 0;
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log('storage changed:', changes, namespace);
    document.getElementById('totalAdsClicked').textContent = changes.totalAdsClicked?.newValue || 0;
  });

  function saveOptions() {
    const enabled = document.getElementById('enabled').checked;
    chrome.storage.sync.set({ enabled }, () => {
      const enabledText = toggleSwitch.checked ? 'enabled' : 'disabled';
      showNotification('YouTube Ad-Clicker', 'YouTube Ad clicker has been ' + enabledText + '.');
      console.log('Options saved.');
    });
  }
});
