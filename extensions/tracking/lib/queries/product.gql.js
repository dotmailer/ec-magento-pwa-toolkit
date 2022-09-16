import { gql } from '@apollo/client';

export const GET_PRODUCT_BRAND_VALUE = gql`
    query getProductBrandValue($product_ids: [String]!) {
        productBrands(product_ids: $product_ids) {
            items {
                brand
                product_id
            }
        }
    }
`;

export const GET_PRODUCT_DETAIL_QUERY = gql`
    query getProductDetailForProductPage($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                id
                uid
                name
                sku
                categories {
                    uid
                    name
                }
                description {
                    html
                }
                media_gallery_entries {
                    uid
                    label
                    position
                    disabled
                    file
                }
                price_range {
                    minimum_price {
                        regular_price {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        discount {
                            amount_off
                        }
                    }
                }
                small_image {
                    url
                }
                stock_status
                url_key
                custom_attributes {
                    selected_attribute_options {
                        attribute_option {
                            uid
                            label
                            is_default
                        }
                    }
                    entered_attribute_value {
                        value
                    }
                    attribute_metadata {
                        uid
                        code
                        label
                        attribute_labels {
                            store_code
                            label
                        }
                        data_type
                        is_system
                        entity_type
                        ui_input {
                            ui_input_type
                            is_html_allowed
                        }
                    }
                }
                ... on ConfigurableProduct {
                    # eslint-disable-next-line @graphql-eslint/require-id-when-available
                    configurable_options {
                        attribute_code
                        attribute_id
                        uid
                        label
                        # eslint-disable-next-line @graphql-eslint/require-id-when-available
                        values {
                            uid
                            default_label
                            label
                            store_label
                            use_default_value
                            value_index
                            swatch_data {
                                ... on ImageSwatchData {
                                    thumbnail
                                }
                                value
                            }
                        }
                    }
                    variants {
                        attributes {
                            code
                            value_index
                        }
                        # eslint-disable-next-line @graphql-eslint/require-id-when-available
                        product {
                            uid
                            # eslint-disable-next-line @graphql-eslint/require-id-when-available
                            media_gallery_entries {
                                uid
                                disabled
                                file
                                label
                                position
                            }
                            sku
                            stock_status
                            price {
                                regularPrice {
                                    amount {
                                        currency
                                        value
                                    }
                                }
                            }
                            price_range {
                                maximum_price {
                                    final_price {
                                        currency
                                        value
                                    }
                                    discount {
                                        amount_off
                                    }
                                }
                            }
                            custom_attributes {
                                selected_attribute_options {
                                    attribute_option {
                                        uid
                                        label
                                        is_default
                                    }
                                }
                                entered_attribute_value {
                                    value
                                }
                                attribute_metadata {
                                    uid
                                    code
                                    label
                                    attribute_labels {
                                        store_code
                                        label
                                    }
                                    data_type
                                    is_system
                                    entity_type
                                    ui_input {
                                        ui_input_type
                                        is_html_allowed
                                    }
                                    ... on ProductAttributeMetadata {
                                        used_in_components
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
