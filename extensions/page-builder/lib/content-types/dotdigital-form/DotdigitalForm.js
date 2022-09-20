import React, { useEffect, useReducer, useState } from 'react';
import { DotdigitalFormReducer } from '../../reducers/DotdigitalFormReducer';
import DotdigitalFormShimmer from './DotdigitalForm.Shimmer';
import { shape, string, bool } from 'prop-types';

const DotdigitalForm = props => {
    const [formReady, setFormReady] = useState(false);
    const { dotdigital_form } = props;
    const [form] = useReducer(DotdigitalFormReducer, dotdigital_form);

    useEffect(() => {
        if (form.hasForm) {
            form.injectByTarget(form.script_id, () =>
                setFormReady(form.loaded)
            );
        }
    }, [form]);

    return (
        <div>
            <DotdigitalFormShimmer display={!formReady && form.isEmbedded} />
            <div
                style={{ display: formReady ? 'block' : 'none' }}
                dangerouslySetInnerHTML={{
                    __html: form.formContainer?.outerHTML
                }}
            />
        </div>
    );
};

DotdigitalForm.propTypes = {
    dotdigital_form: shape({
        formContainer: shape({
            outerHTML: string
        }),
        hasForm: bool,
        isEmbedded: bool
    }),
    content: string
};

export default DotdigitalForm;
