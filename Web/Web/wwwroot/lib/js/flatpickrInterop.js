(function() {
    'use strict';

    const instances = new Map();

    window.flatpickrInterop = {
        init: function(elementId, config) {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error('[flatpickrInterop] Element not found:', elementId);
                return null;
            }

            if (instances.has(elementId)) {
                instances.get(elementId).destroy();
            }

            const defaultConfig = {
                dateFormat: 'd/m/Y',
                allowInput: true,
                locale: 'vn',
                disableMobile: true
            };

            const mergedConfig = Object.assign({}, defaultConfig, config || {});

            const fp = flatpickr(element, mergedConfig);

            fp.config.onChange.push(function(selectedDates, dateStr, instance) {
                const event = new CustomEvent('flatpickr:change', {
                    detail: {
                        dateStr: dateStr,
                        selectedDates: selectedDates
                    },
                    bubbles: true
                });
                element.dispatchEvent(event);
            });

            instances.set(elementId, fp);
            return fp;
        },

        destroy: function(elementId) {
            if (instances.has(elementId)) {
                instances.get(elementId).destroy();
                instances.delete(elementId);
                return true;
            }
            return false;
        },

        setValue: function(elementId, dateStr) {
            const fp = instances.get(elementId);
            if (fp) {
                fp.setDate(dateStr, true);
                return true;
            }
            return false;
        },

        getValue: function(elementId) {
            const fp = instances.get(elementId);
            if (fp) {
                return fp.input.value || '';
            }
            return '';
        },

        parseDate: function(dateStr) {
            if (!dateStr) return null;
            const parsed = flatpickr.parseDate(dateStr, 'd/m/Y');
            return parsed ? parsed.toISOString() : null;
        },

        formatDate: function(date, format) {
            if (!date) return '';
            return flatpickr.formatDate(new Date(date), format || 'd/m/Y');
        },

        clear: function(elementId) {
            const fp = instances.get(elementId);
            if (fp) {
                fp.clear();
                return true;
            }
            return false;
        },

        setMinDate: function(elementId, date) {
            const fp = instances.get(elementId);
            if (fp) {
                fp.set('minDate', date);
                return true;
            }
            return false;
        },

        setMaxDate: function(elementId, date) {
            const fp = instances.get(elementId);
            if (fp) {
                fp.set('maxDate', date);
                return true;
            }
            return false;
        },

        setupFlatpickrListener: function(elementId, dotNetObject) {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error('[flatpickrInterop] Element not found for listener:', elementId);
                return false;
            }

            const handler = function(event) {
                const dateStr = event.detail.dateStr;
                if (dateStr) {
                    dotNetObject.invokeMethodAsync('OnFlatpickrChange', dateStr);
                } else {
                    dotNetObject.invokeMethodAsync('OnFlatpickrChange', '');
                }
            };

            element.addEventListener('flatpickr:change', handler);

            const existingListeners = element._flatpickrListeners || [];
            existingListeners.push({ event: 'flatpickr:change', handler: handler });
            element._flatpickrListeners = existingListeners;

            return true;
        },

        removeFlatpickrListener: function(elementId) {
            const element = document.getElementById(elementId);
            if (!element || !element._flatpickrListeners) {
                return false;
            }

            element._flatpickrListeners.forEach(function(listener) {
                element.removeEventListener(listener.event, listener.handler);
            });
            element._flatpickrListeners = [];

            return true;
        }
    };
})();
