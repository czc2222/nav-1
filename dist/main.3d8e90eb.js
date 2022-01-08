// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $webList = $('.webList');
var $lastWeb = $webList.find('li.lastWeb');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x); //将字符串转成对象

var hashMap = xObject || [{
  logo: 'M',
  url: 'https://developer.mozilla.org/zh-CN/docs/Web'
}, {
  logo: 'W',
  url: 'https://www.w3.org'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}]; //弄个hash表对应每个网页

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, ''); //删除/开头的内容
}; //将前置协议替换成''


var render = function render() {
  $webList.find('li:not(.lastWeb)').remove(); //由于点添加按钮的时候会多生成之前的网页，因此要在生成之前先清空，这样就不会重复

  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        \n            <div class=\"web\">\n                <div class=\"logo\">\n                    ".concat(node.logo, "\n                </div>\n                <div class=\"webLink\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n                </div>\n            </div>\n        \n    </li>")).insertBefore($lastWeb); //将li插入到添加网址的div前面

    $li.on('click', function () {
      window.open(node.url);
    }); //监听点击事件，点击之后跳转页面

    $li.on('click', '.close', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1); //点击x之后删除网页，splice是数组删除

      render(); //重新渲染页面
    });
  });
};

render(); //渲染一遍

$('.addButton').on('click', function () {
  var url = window.prompt('请输入你要添加的网址'); //监听用户输入网址事件

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  } //如果用户少输入https，我们就加上


  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  }); //将用户输入的网页添加到hashmap上

  render(); //加入新的网页，重新渲染
});

window.onbeforeunload = function () {
  console.log('页面关闭之前触发');
  var string = JSON.stringify(hashMap); //由于localStorage只能存字符串，因此把hashmap转换成字符串

  localStorage.setItem('x', string); //在localStorage存储网页
}; //window.onbeforeunload 是关闭页面之前触发


$(document).on('keypress', function (e) {
  var key = e.key; //const key =e.key 的简写

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
}); //键盘输入字母找到对应的字母网页并打开
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.3d8e90eb.js.map