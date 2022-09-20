import { getAdvanced } from '@magento/pagebuilder/lib/utils';
import { DotdigitalFormScript } from '../../model/DotdigitalFormScript';
const ConfigAggregator = node => {
    const dotdigital_form = new DotdigitalFormScript(node.outerHTML);
    return {
        content: node.outerHTML,
        dotdigital_form: dotdigital_form,
        ...getAdvanced(node)
    };
};

export default ConfigAggregator;
