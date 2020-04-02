(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Editor = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector("iframe");
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load("../" + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
              textNodes.push(node);
            } else {
              recursy(node);
            }
          });
        }

        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement("text-editor");

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = "true";
        });
      });
    }
  }]);

  return Editor;
}();

exports["default"] = Editor;

},{}],2:[function(require,module,exports){
"use strict";

/*eslint-disable */
HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var _editor = _interopRequireDefault(require("./editor"));

require("./iframe-load");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.editor = new _editor["default"]();

window.onload = function () {
  window.editor.open('index.html');
};

},{"./editor":1,"./iframe-load":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2VkaXRvci5qcyIsImFwcC9zcmMvaWZyYW1lLWxvYWQuanMiLCJhcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0lDQXFCLE07QUFDakIsb0JBQWM7QUFBQTs7QUFDVixTQUFLLE1BQUwsR0FBYyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0g7Ozs7eUJBRUksSSxFQUFNO0FBQUE7O0FBQ1AsV0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixRQUFRLElBQXpCLEVBQStCLFlBQU07QUFDakMsWUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQUwsQ0FBWSxlQUFaLENBQTRCLElBQXpDO0FBRUEsWUFBSSxTQUFTLEdBQUcsRUFBaEI7O0FBRUEsaUJBQVMsT0FBVCxDQUFpQixPQUFqQixFQUEwQjtBQUN0QixVQUFBLE9BQU8sQ0FBQyxVQUFSLENBQW1CLE9BQW5CLENBQTJCLFVBQUMsSUFBRCxFQUFVO0FBQ2pDLGdCQUFHLElBQUksQ0FBQyxRQUFMLEtBQWtCLE9BQWxCLElBQTZCLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUF1QixNQUF2QixFQUErQixFQUEvQixFQUFtQyxNQUFuQyxHQUE0QyxDQUE1RSxFQUErRTtBQUMzRSxjQUFBLFNBQVMsQ0FBQyxJQUFWLENBQWUsSUFBZjtBQUNILGFBRkQsTUFFTztBQUNILGNBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUNIO0FBRUosV0FQRDtBQVFIOztBQUNELFFBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUVBLFFBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsVUFBQSxJQUFJLEVBQUk7QUFDdEIsY0FBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQUwsQ0FBWSxlQUFaLENBQTRCLGFBQTVCLENBQTBDLGFBQTFDLENBQWhCOztBQUNBLFVBQUEsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsT0FBN0IsRUFBc0MsSUFBdEM7QUFDQSxVQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLElBQXBCO0FBQ0EsVUFBQSxPQUFPLENBQUMsZUFBUixHQUEwQixNQUExQjtBQUNILFNBTEQ7QUFVSCxPQTNCRDtBQTRCSDs7Ozs7Ozs7Ozs7QUNsQ0w7QUFDQSxpQkFBaUIsQ0FBQyxTQUFsQixDQUE0QixJQUE1QixHQUFtQyxVQUFVLEdBQVYsRUFBZSxRQUFmLEVBQXlCO0FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQWY7O0FBQ0EsTUFBSTtBQUNBLElBQUEsTUFBTSxDQUFDLEdBQVAsR0FBYSxHQUFHLEdBQUcsT0FBTixHQUFnQixJQUFJLENBQUMsTUFBTCxHQUFjLFFBQWQsR0FBeUIsU0FBekIsQ0FBbUMsQ0FBbkMsQ0FBN0I7QUFDSCxHQUZELENBRUUsT0FBTyxLQUFQLEVBQWM7QUFDWixRQUFJLENBQUMsUUFBTCxFQUFlO0FBQ1gsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3BDLFFBQUEsTUFBTSxDQUFDLEtBQUQsQ0FBTjtBQUNILE9BRk0sQ0FBUDtBQUdILEtBSkQsTUFJTztBQUNILE1BQUEsUUFBUSxDQUFDLEtBQUQsQ0FBUjtBQUNIO0FBQ0o7O0FBRUQsTUFBTSxPQUFPLEdBQUcsS0FBaEI7QUFDQSxNQUFNLFFBQVEsR0FBRyxHQUFqQjtBQUVBLE1BQUksVUFBVSxHQUFHLENBQWpCOztBQUVBLE1BQUksQ0FBQyxRQUFMLEVBQWU7QUFDWCxXQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDcEMsVUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVk7QUFDbEMsWUFBSSxDQUFDLE1BQUwsRUFBYSxPQUFPLGFBQWEsQ0FBQyxLQUFELENBQXBCO0FBQ2IsUUFBQSxVQUFVOztBQUNWLFlBQUksTUFBTSxDQUFDLGVBQVAsSUFBMEIsTUFBTSxDQUFDLGVBQVAsQ0FBdUIsVUFBdkIsS0FBc0MsVUFBcEUsRUFBZ0Y7QUFDNUUsVUFBQSxhQUFhLENBQUMsS0FBRCxDQUFiO0FBQ0EsVUFBQSxPQUFPO0FBQ1YsU0FIRCxNQUdPLElBQUksVUFBVSxHQUFHLFFBQWIsR0FBd0IsT0FBNUIsRUFBcUM7QUFDeEMsVUFBQSxNQUFNLENBQUMsSUFBSSxLQUFKLENBQVUsbUJBQVYsQ0FBRCxDQUFOO0FBQ0g7QUFDSixPQVR3QixFQVN0QixRQVRzQixDQUF6QjtBQVVILEtBWE0sQ0FBUDtBQVlILEdBYkQsTUFhTztBQUNILFFBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZO0FBQ2xDLFVBQUksQ0FBQyxNQUFMLEVBQWEsT0FBTyxhQUFhLENBQUMsS0FBRCxDQUFwQjs7QUFDYixVQUFJLE1BQU0sQ0FBQyxlQUFQLElBQTBCLE1BQU0sQ0FBQyxlQUFQLENBQXVCLFVBQXZCLEtBQXNDLFVBQXBFLEVBQWdGO0FBQzVFLFFBQUEsYUFBYSxDQUFDLEtBQUQsQ0FBYjtBQUNBLFFBQUEsUUFBUTtBQUNYLE9BSEQsTUFHTyxJQUFJLFVBQVUsR0FBRyxRQUFiLEdBQXdCLE9BQTVCLEVBQXFDO0FBQ3hDLFFBQUEsUUFBUSxDQUFDLElBQUksS0FBSixDQUFVLG1CQUFWLENBQUQsQ0FBUjtBQUNIO0FBQ0osS0FSd0IsRUFRdEIsUUFSc0IsQ0FBekI7QUFTSDtBQUNKLENBM0NEOzs7OztBQ0RBOztBQUNBOzs7O0FBQ0EsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBSSxrQkFBSixFQUFoQjs7QUFFQSxNQUFNLENBQUMsTUFBUCxHQUFnQixZQUFNO0FBQ2xCLEVBQUEsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkLENBQW1CLFlBQW5CO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIilcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKHBhZ2UpIHtcclxuICAgICAgICB0aGlzLmlmcmFtZS5sb2FkKFwiLi4vXCIgKyBwYWdlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0Tm9kZXMgPSBbXVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVjdXJzeShlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5vZGUubm9kZU5hbWUgPT09IFwiI3RleHRcIiAmJiBub2RlLm5vZGVWYWx1ZS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnN5KG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVjdXJzeShib2R5KVxyXG5cclxuICAgICAgICAgICAgdGV4dE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0LWVkaXRvclwiKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5jb250ZW50RWRpdGFibGUgPSBcInRydWVcIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCIvKmVzbGludC1kaXNhYmxlICovXHJcbkhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGlmcmFtZSA9IHRoaXM7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSB1cmwgKyBcIj9ybmQ9XCIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF4VGltZSA9IDYwMDAwO1xyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAyMDA7XHJcblxyXG4gICAgbGV0IHRpbWVyQ291bnQgPSAwO1xyXG5cclxuICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaWZyYW1lKSByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiBpZnJhbWUuY29udGVudERvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZXJDb3VudCAqIGludGVydmFsID4gbWF4VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpZnJhbWUpIHJldHVybiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50RG9jdW1lbnQgJiYgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lckNvdW50ICogaW50ZXJ2YWwgPiBtYXhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBpbnRlcnZhbCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRWRpdG9yIGZyb20gXCIuL2VkaXRvclwiO1xyXG5pbXBvcnQgXCIuL2lmcmFtZS1sb2FkXCJcclxud2luZG93LmVkaXRvciA9IG5ldyBFZGl0b3IoKVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5lZGl0b3Iub3BlbignaW5kZXguaHRtbCcpXHJcbn0iXX0=
