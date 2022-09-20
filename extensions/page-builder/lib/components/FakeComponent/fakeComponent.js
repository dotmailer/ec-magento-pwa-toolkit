import { setContentTypeConfig } from '@magento/pagebuilder/lib/config';
import { ContentTypes } from '../../content-types';

/**
 * NOTE: This is a temporary solution to allow the config to be passed to the
 * components. This will be replaced with a context solution in the future.
 */
Object.entries(ContentTypes).forEach(entry => {
    const [contentTypeName, contentTypeConfig] = entry;
    setContentTypeConfig(contentTypeName, contentTypeConfig);
});

const fakeComponent = () => {
    return null;
};

export default fakeComponent;
