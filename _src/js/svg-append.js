
var SvgAppend = (function () {

	/**
	 * SvgAppend request
	 * @param viewport {Element}
	 * @param url {string}
	 * @param callback {object}
	 * @constructor
	 */
	function SvgAppend(viewport, url, callback) {

		var self = this;

		this.viewport = viewport;
		this.url = url;
		this.callback = callback;

		this.get();

	}

	/**
	 * Append to element
	 * @param toElement {Element}
	 * @param before {Element}
	 */
	SvgAppend.prototype.appendTo = function (toElement, before) {

		if (!before)
			toElement.appendChild(this.viewport);
		else
			toElement.insertBefore(this.viewport, before);

	};

	/**
	 * Clone the SvgAppend and append to element
	 * @param toElement {Element}
	 */
	SvgAppend.prototype.cloneTo = function (toElement) {

		toElement.innerHTML = this.content;

	};

	SvgAppend.prototype.get = function () {

		var self = this;

		if (this.viewport && this.url) {

			var request = new XMLHttpRequest();
			request.open('GET', this.url, true);

			request.onreadystatechange = function() {

				if (this.readyState === 4)
					if (this.status == 200)
						if (this.responseText) {

							try {

								self.content = this.responseText;
								self.viewport.innerHTML = self.content;
								if (self.callback)
									self.callback();

							} catch (e) { }

						}

			};

			request.send();
			request = null;

		}

	};

	return SvgAppend;

})();