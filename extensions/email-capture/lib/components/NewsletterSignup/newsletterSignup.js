import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'informed';
import { useToasts } from '@magento/peregrine';
import { useNewsletterSignup } from '../../talons/NewsletterSignup/useNewsletterSignup';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Field from '@magento/venia-ui/lib/components/Field';
import defaultClasses from './newsletterSignup.css';
import FormError from "@magento/venia-ui/lib/components/FormError";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";

const NewsletterSignup = props => {
    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, props.classes);

    const [, { addToast }] = useToasts();

    const afterSubmit = useCallback(() => {
        addToast({
            type: 'info',
            message: formatMessage({
                id: 'newsletterSignup.preferencesText',
                defaultMessage: 'Thank you for your subscription.'
            }),
            timeout: 5000
        });
    }, [addToast, formatMessage]);

    const talonProps = useNewsletterSignup({ afterSubmit });

    const {
        formErrors,
        handleSubmit,
        isDisabled,
        setFormApi
    } = talonProps;

    return (
        <div className={classes.root}>
            <div className={classes.inputField}>
                <Form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    getApi={setFormApi}
                >
                    <Field label="Email" required={true}>
                        <TextInput
                            field="email"
                            id="email"
                            autoComplete="email"
                            validate={isRequired}
                            validateOnBlur
                            placeholder="Email"
                            label="Email"
                        />
                    </Field>
                    <FormError errors={formErrors} />
                    <div className={classes.actions}>
                        <Button disabled={isDisabled} type="submit" priority="high">
                            {'Submit'}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default NewsletterSignup;
