import React, { createContext, useContext, useReducer } from "react";
export const PaymentContext = createContext();


export default function PaymentContextProvider({ children }) {

    const GenerateOrderDetail = (product) => new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_LOCAL_API}/api/payment/orders/`,
            { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(product) })
            .then((response) => {
                if (response.ok) {
                    const JSONResponse = response.json();
                    resolve(JSONResponse);
                } else {
                    reject(response);
                }
            }).catch((error) => {
                reject(error);
            });
    });
    const InitialisePayment = (OrderDetail, Then, Catch, Finally) => new Promise(async (resolve, reject) => {
        const options = {
            key: "rzp_test_2wAvBGCeFrYOxa",
            name: OrderDetail?.notes[0] || 'Resumefy charges',
            order_id: OrderDetail.id,
            handler: async (response) => {
                await fetch(`${import.meta.env.VITE_LOCAL_API}/api/payment/verify`, {
                    method: 'POST',
                    body: JSON.stringify(response),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then((_response) => {
                        if (_response.ok) {
                            Then(_response)
                        } else {
                            Catch(_response)
                        }
                        Finally();
                    })
                    .catch((error) => {
                        Catch(error);
                        Finally();
                    })
            },
            ...OrderDetail
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    })

    return (
        <PaymentContext.Provider value={{ GenerateOrderDetail, InitialisePayment }}>{children}</PaymentContext.Provider>
    )
}

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (!context) throw Error("useDocumentsContext must be used inside an AuthContextProvider");
    return context;
}
