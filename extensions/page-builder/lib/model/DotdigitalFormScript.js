export class DotdigitalFormScript {
    constructor(content, format = 'text/html') {
        this._format = format;
        this._parser = new DOMParser();
        this._content = this._parser.parseFromString(content, this._format);
        this._form_loaded = false;
        this._script = document.createElement('script');
        this._script_id = this._getScriptParameterByName('id');
    }

    static create(content) {
        return new DotdigitalFormScript(content);
    }

    injectByTarget(target = this.script_id, onReady = () => {}) {
        const target_element = document.getElementById(target);
        if (target_element) {
            this._script.src = this.formScript.src;
            this._script.async = true;
            target_element.appendChild(this._script);
            this._listenIframeInjected(target_element, onReady);
        }
    }

    _listenIframeInjected(target_element, onReady) {
        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    mutation.type === 'childList' &&
                    mutation.addedNodes.length > 0
                ) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === 'IFRAME') {
                            this._form_loaded = true;
                            onReady(node);
                            observer.disconnect();
                        }
                    });
                }
            });
        });
        observer.observe(target_element, config);
    }

    _getContext() {
        if (context) {
            this._context = JSON.parse(context.innerHTML);
        }
    }

    _getScriptParameterByName(name) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(this.formScript.src);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    get script_id() {
        return `ddg-form-${this._script_id.replace(/\//g, '-')}`;
    }

    get loaded() {
        return this._form_loaded;
    }

    get hasForm() {
        return (
            this._content.querySelector(
                'div[data-content-type="dotdigitalgroup_form"]'
            ) != null
        );
    }

    get isEmbedded() {
        if (this.formScript) {
            return this.formScript.src.includes('embedded');
        }
        return false;
        // return this.formScript?.getAttribute('data-form-style') === 'embedded';
    }

    get formElement() {
        if (this.hasForm) {
            return this._content.querySelector(
                'div[data-content-type="dotdigitalgroup_form"]'
            );
        }
        return null;
    }

    get formScript() {
        if (this.hasForm) {
            return this.formElement.querySelector('script');
        }
        return null;
    }

    get formContainer() {
        if (this.hasForm) {
            return this.formElement.querySelector(
                'div[data-element="container"]'
            );
        }
        return null;
    }
}
