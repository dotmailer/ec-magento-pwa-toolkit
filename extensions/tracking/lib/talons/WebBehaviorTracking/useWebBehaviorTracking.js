import {useEffect, useReducer, useState} from 'react';;
import useTrackingData from '../../hooks/useTrackingData';
import {useMagentoRoute} from '@magento/peregrine/lib/talons/MagentoRoute/useMagentoRoute';
import {useProduct} from "../../hooks/useProduct";
import {useStoreSlug} from "../../hooks/useStoreSlug";
import {useProductBrand} from "../../hooks/useProductBrand";
import {CollectionReducer} from "../../reducers/CollectionReducer";
import {ProductCollection} from "../../model/ProductCollection";

const useWebBehaviourTracking = () => {

    const [collection,dispatch] = useReducer(CollectionReducer, new ProductCollection());
    const data = useTrackingData();
    const talonProps = useMagentoRoute();
    const {component: RootComponent,...componentData} = talonProps;
    const {urlKey} = useStoreSlug();
    const {loading:productsLoading,data:productData} = useProduct(urlKey, componentData);
    const {loading:brandLoading,data:brandData} = useProductBrand(collection);

    useEffect(() =>  dispatch({type: 'RESET_STATE'}),[urlKey]);
    useEffect(() => {

        if(productData){
            productData.products.items.forEach( product => dispatch({type:'ADD_PRODUCT',product}));
        }

        if(brandData){
            brandData?.productBrands?.items?.forEach( brand => dispatch({type:'ADD_BRAND',brand}));
        }

    } ,[productData,brandData]);


    // dmptv4 for WBT
    useEffect( () => {

            if(brandLoading) return;
            if(productsLoading) return;

            const script = document.createElement('script');
            if (data && data.trackingData.wbt_profile_id) {
                if (process.env.NODE_ENV === 'development') {
                    console.log(`WBT profile id: ${data.trackingData.wbt_profile_id}`)
                }

                script.dangerouslySetInnerHTML = (
                        (function(w,d,u,t,o,c){w['dmtrackingobjectname']=o;c=d.createElement(t);c.async=1;c.src=u;t=d.getElementsByTagName
                        (t)[0];t.parentNode.insertBefore(c,t);w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};
                        })(window, document, '//static.trackedweb.net/js/_dmptv4.js', 'script', 'dmPt'),
                        window.dmPt('create', data.trackingData.wbt_profile_id)
                )
                document.body.appendChild(script);

                if (typeof window.dmPt == 'function') {
                    let trackingData = {};
                    if(!collection.empty)
                    {
                        trackingData = collection.getByTypeOrFirst("SimpleProduct").toTrackingData()
                    }

                    window.dmPt('track', trackingData || {});

                    if (process.env.NODE_ENV === 'development') {
                        console.log(
                            'dotdigital triggered web behaviour tracking: '
                            + window.location.pathname
                            + ' data: '
                            + JSON.stringify(trackingData)
                            )
                    }
                }

                return () => {
                    if (document.body) {
                        document.body.removeChild(script);
                    }
                }
            }

    }, [collection]);



};

export default useWebBehaviourTracking;
