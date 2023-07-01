'use strict';

const templatesContent= {};
const mainContainer = document.body;

const inject = (template, callback) => {
    // append new template for future fetch
    let html = document.importNode(templatesContent[template].querySelector('template').content, true);
    mainContainer.innerHTML = '';
    mainContainer.appendChild(html);
    // calling callback without params
    callback();
}

const loadTemplatsContent = (template, callback) => {
    if (templatesContent[template]) {
        inject(template, callback);
    } else {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            // append new template for future fetch
            templatesContent[template] = new DOMParser().parseFromString(xhr.responseText, 'text/html');
            return inject(template, callback);
        };
        xhr.onerror = (err) => {
            return callback(`Could not fetch template: ${template}.`);
        };
        xhr.open('GET', `./templates/${template}.html`);
        xhr.send(null);
    }
}