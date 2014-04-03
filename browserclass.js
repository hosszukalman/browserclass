/**
 * Browser class Plugin v1.0
 *
 * Public repository: https://github.com/hosszukalman/browserclass
 * Examples and documentation at:
 * Author: Kálmán Hosszu
 * - twitter: kalmanhosszu
 * - github: https://github.com/hosszukalman
 * - drupal.org: https://drupal.org/user/267481
 */

var BrowserClass = {
  init: function() {
    this.classes = [];
    this.agent = navigator.userAgent.toLowerCase();
    this.checkBrowser();
    this.checkPlatform();
    if (this.isMobile(this.classes)) {
      this.classes.push('mobile');
    } else {
      this.classes.push('desktop');
    }
  },

  checkBrowser: function() {
    var matches = [];
    var aresult = '';
    var aversion = '';
    var resultant = '';

    var iePattern = /(?:\b(ms)?ie\s+|\btrident\/7\.0;.*\s+rv:)(\d+)/;
    var ieMatch = this.agent.match(iePattern);

    if (ieMatch) {
      this.classes.push('ie');

      if (typeof ieMatch[2] !== 'undefined') {
        this.classes.push('ie' + ieMatch[2]);
      }
    }

    if (this.agent.match(/opera/)) {
      this.classes.push('opera');

      aresult = this.stristr(this.agent, 'version').split('/');
      if(aresult[1]) {
        aversion = aresult[1].split(' ');
        this.classes.push('opera' + this.clearVersion(aversion[0]));
      }
    }

    // Check for chrome desktop first, then chrome mobile, lastly check for
    // safari, as these are mutually exclusive.
    if (this.agent.match(/chrome/)) {
      this.classes.push('chrome');

      aresult = this.getSrtingAfter(this.agent, 'chrome').split('/');
      aversion = aresult[1].split(' ');
      this.classes.push('chrome' + this.clearVersion(aversion[0]));
    } else if (this.agent.match(/crios/)) {
      this.classes.push('chrome');
      aresult = this.getSrtingAfter(this.agent, 'crios').split('/');

      if (aresult[1]) {
        aversion = aresult[1].split(' ');
        this.classes.push('chrome' + this.clearVersion(aversion[0]));
      }
    } else if (this.agent.match(/safari/)) {
      this.classes.push('safari');
      aresult = this.getSrtingAfter(this.agent, 'version').split('/');

      if(aresult[1]) {
        aversion = aresult[1].split(' ');
        this.classes.push('safari' + this.clearVersion(aversion[0]));
      }
    }

    if (this.agent.match(/netscape/)) {
      this.classes.push('netscape');

      matches = this.agent.match(/navigator\/([^ ]*)/);
      if (matches) {
        this.classes.push('netscape' + this.clearVersion(matches[1]));
      }
      else {
        matches = this.agent.match(/netscape6?\/([^ ]*)/);
        if (matches) {
          this.classes.push('netscape' + this.clearVersion(matches[1]));
        }
      }
    }

    if (this.agent.match(/firefox/)) {
      this.classes.push('ff');
      matches = this.agent.match(/firefox[\/ \(]([^ ;\)]+)/);
      if(matches) {
        this.classes.push('ff' + this.clearVersion(matches[1]));
      }
    }

    if (this.agent.match(/konqueror/)) {
      this.classes.push('konqueror');

      aresult = this.getSrtingAfter(this.agent, 'konqueror').split(' ');
      aversion = aresult[0].split('/');
      this.classes.push('konqueror' + this.clearVersion(aversion[1]));
    }

    if (this.agent.match(/dillo/)) {
      this.classes.push('dillo');
    }

    if (this.agent.match(/chimera/)) {
      this.classes.push('chimera');
    }

    if (this.agent.match(/beonex/)) {
      this.classes.push('beonex');
    }

    if (this.agent.match(/aweb/)) {
      this.classes.push('aweb');
    }

    if (this.agent.match(/amaya/)) {
      this.classes.push('amaya');
    }

    if (this.agent.match(/icab/)) {
      this.classes.push('icab');
    }

    if (this.agent.match(/lynx/)) {
      this.classes.push('lynx');
    }

    if (this.agent.match(/galeon/)) {
      this.classes.push('galeon');
    }

    if (this.agent.match(/opera mini/)) {
      this.classes.push('operamini');

      resultant = this.getSrtingAfter(this.agent, 'opera mini');
      if(resultant.match('/\//')) {
        aresult = resultant.split('/');
        aversion = aresult[1].split(' ');
        this.classes.push('operamini' + this.clearVersion(aversion[0]));
      }
      else {
        aversion = this.getSrtingAfter(resultant, 'opera mini').split(' ');
        this.classes.push('operamini' + this.clearVersion(aversion[1]));
      }
    }
  },

  checkPlatform: function() {
    if (this.agent.match(/windows/)) {
      this.classes.push('win');
    }

    if (this.agent.match(/ipad/)) {
      this.classes.push('ipad');
    }

    if (this.agent.match(/ipod/)) {
      this.classes.push('ipod');
    }

    if (this.agent.match(/iphone/)) {
      this.classes.push('iphone');
    }

    if (this.agent.match(/mac/)) {
      this.classes.push('mac');
    }

    if (this.agent.match(/android/)) {
      this.classes.push('android');
    }

    if (this.agent.match(/linux/)) {
      this.classes.push('linux');
    }

    if (this.agent.match(/nokia/)) {
      this.classes.push('nokia');
    }

    if (this.agent.match(/blackberry/)) {
      this.classes.push('blackberry');
    }

    if (this.agent.match(/freebsd/)) {
      this.classes.push('freebsd');
    }

    if (this.agent.match(/openbsd/)) {
      this.classes.push('openbsd');
    }

    if (this.agent.match(/netbsd/)) {
      this.classes.push('netbsd');
    }
  },

  isMobile: function(classes) {
    var mobile_devices = ['ipad', 'ipod', 'iphone', 'android', 'blackberry', 'operamini'];
    var mobile_devices_test = false;

    for (var i = 0; i < mobile_devices.length; i++) {
      if (classes.indexOf(mobile_devices[i]) != -1) {
        mobile_devices_test = true;

        // Terminate the for loop, since a match has been found.
        return false;
      }
    }

    if (mobile_devices_test || this.agent.match(/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|pda|psp|treo)/)) {
      return true;
    }
  },

  clearVersion: function(version) {
    version = version.replace('/[^0-9,.,a-z,A-Z-]/', '');
    var find = (version + '').indexOf('.');
    return version.substr(0, find);
  },

  getSrtingAfter: function(string, find) {
    if (matches = string.match('(' + find + '.*)')) {
      return matches[1];
    }

    return null;
  }

};

window.onload = function () {
  BrowserClass.init();
  var element = document.getElementsByTagName("BODY")[0];
  element.className += " " + BrowserClass.classes.join(' ');
}
