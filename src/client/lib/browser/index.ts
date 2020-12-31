export default () => {
  const nAgt = window.navigator.userAgent;
  type osData = {
    displayName: string;
    name: string;
    active: boolean;
  };
  const osArray: osData[] = [{
    displayName: 'Android',
    name: 'android',
    active: nAgt.includes('Android'),
  }, {
    displayName: 'Chrome OS',
    name: 'chromeos',
    active: nAgt.includes('CrOS'),
  }, {
    displayName: 'Tizen',
    name: 'tizen',
    active: nAgt.includes('Tizen'),
  }, {
    displayName: 'iOS',
    name: 'ios',
    active: /iPad|iPhone|iPod/.test(nAgt) || false
  }, {
    displayName: 'Linux',
    name: 'linuxBased',
    active: nAgt.includes('Android') || nAgt.includes('Tizen'),
  }, {
    displayName: 'Windows',
    name: 'windows',
    active: nAgt.includes('Windows'),
  }, {
    displayName: 'Mac OS',
    name: 'macos',
    active: nAgt.includes('Macintosh'),
  }, {
    displayName: 'Linux',
    name: 'linux',
    active: nAgt.includes('Linux'),
  }];
  let browserName = window.navigator.appName;
  let fullVersion = `${parseFloat(window.navigator.appVersion)}`;
  let majorVersion = parseInt(window.navigator.appVersion, 10);
  let nameOffset = 0;
  let verOffset = 0;
  let ix = 0;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
    browserName = 'Opera';
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) !== -1) {
       fullVersion = nAgt.substring(verOffset + 8);
    }
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
    browserName = 'Microsoft Internet Explorer';
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
    browserName = 'Chrome';
    fullVersion = nAgt.substring(verOffset + 7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
    browserName = 'Safari';
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) !== -1) {
      fullVersion = nAgt.substring(verOffset + 8);
    }
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
    browserName = 'Firefox';
    fullVersion = nAgt.substring(verOffset + 8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() === browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(';')) !== -1) {
    fullVersion = fullVersion.substring(0, ix);
  }
  if ((ix = fullVersion.indexOf(' ')) !== -1) {
    fullVersion = fullVersion.substring(0, ix);
  }

  majorVersion = parseInt(`${fullVersion}`, 10);
  if (isNaN(majorVersion)) {
    fullVersion = `${parseFloat(window.navigator.appVersion)}`;
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  return {
    browserName,
    operatingSystem: osArray.filter((current) => { return current.active; })[0].displayName,
    fullVersion,
    majorVersion,
    navAppName: navigator.appName,
    navUserAgent: navigator.userAgent
  };
};
