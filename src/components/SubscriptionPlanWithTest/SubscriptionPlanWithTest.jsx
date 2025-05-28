import React, { useState } from 'react';

const SubscriptionForm = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [isPrePlan, setIsPrePlan] = useState(true);

    const services = [
        { id: 1, name: 'Service 1' },
        { id: 2, name: 'Service 2' },
        { id: 3, name: 'Service 3' },
    ];

    const prePricePlan = [
        { id: 1, range: '50 credits', price: '$0.30/image' },
        { id: 2, range: '200 credits', price: '$0.26/image' },
        { id: 3, range: '500 credits', price: '$0.20/image' },
    ];

    const postPricePlan = [
        { id: 1, range: '50 credits', price: '$0.35/image' },
        { id: 2, range: '200 credits', price: '$0.30/image' },
        { id: 3, range: '500 credits', price: '$0.25/image' },
    ];

    const handleServiceChange = (serviceId) => {
        const isSelected = selectedServices.includes(serviceId);

        if (isSelected) {
            setSelectedServices(selectedServices.filter((id) => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    const handlePlanChange = (planId) => {
        setSelectedPlan(planId);
    };

    const handlePrePlanClick = () => {
        setIsPrePlan(true);
        setSelectedPlan(prePricePlan[0].id);
    };

    const handlePostPlanClick = () => {
        setIsPrePlan(false);
        setSelectedPlan(postPricePlan[0].id);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Process the selected services and plan
      
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-[#D6F2D8] w-[380px] shadow-xl px-8 py-6" onSubmit={handleSubmit}>
                <h2 className="font-bold text-3xl rounded-3xl text-green-500 bg-white shadow-xl py-6">Subscription Plan</h2>
                <div className="flex gap-1 mt-5 justify-center">
                    <button
                        className={`${isPrePlan ? 'bg-cyan-400' : 'bg-gray-300'
                            } px-4 py-1 rounded-md text-white shadow-xl font-semibold`}
                        onClick={handlePrePlanClick}
                    >
                        Pre-Plan
                    </button>
                    <button
                        className={`${!isPrePlan ? 'bg-cyan-400' : 'bg-gray-300'
                            } px-4 py-1 rounded-md text-white shadow-xl font-semibold`}
                        onClick={handlePostPlanClick}
                    >
                        Post-Plan
                    </button>
                </div>
                <label className="block text-gray-700  font-bold mt-4 mb-2">Services</label>
                <div className="mb-4 flex justify-center gap-2">
                    {services.map((service) => (
                        <div key={service.id} className="mb-2">
                            {/* <label className="flex  justify-center ">
                                <input
                                    type="checkbox"
                                    className="form-checkbox rounded-full h-5 w-5 "
                                    onChange={() => handleServiceChange(service.id)}
                                    checked={selectedServices.includes(service.id)}
                                />
                                <span className="ml-2 text-gray-700">{service.name}</span>
                            </label> */}
                            <div className="form-group form-check">
                                <label className='flex  justify-center' >
                                    <input
                                        onChange={() => handleServiceChange(service.id)}
                                        checked={selectedServices.includes(service.id)}
                                        type="checkbox"
                                        className="form-check-input   appearance-none h-3 w-3 border border-gray-700 rounded-sm bg-white checked:bg-green-400 checked:border-green-700 focus:outline-none  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    // id="exampleCheck2"
                                    />

                                    <span className=" text-gray-700 text-sm cursor-pointer">{service.name}</span>
                                </label>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Price Plan</label>
                    {isPrePlan ? (
                        <div className="mb-2">
                            {prePricePlan.map((plan) => (
                                <label key={plan.id} className="flex justify-center" >
                                    <input
                                        type="radio"
                                        className="form-radio appearance-none h-3 w-3 border border-gray-700 rounded-full bg-white checked:bg-green-400 checked:border-green-700 focus:outline-none  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        onChange={() => handlePlanChange(plan.id)}
                                        checked={selectedPlan === plan.id}
                                    />
                                    <span className=" text-gray-700 flex justify-between w-48 text-sm">
                                        <p>{plan.range}</p>
                                        <p>{plan.price}</p>
                                    </span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="mb-2">
                            {postPricePlan.map((plan) => (
                                <label key={plan.id} className="flex justify-center ">
                                    <input
                                        type="radio"
                                        className="form-radio appearance-none h-3 w-3 border border-gray-700 rounded-full bg-white checked:bg-green-400 checked:border-green-700 focus:outline-none  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        onChange={() => handlePlanChange(plan.id)}
                                        checked={selectedPlan === plan.id}
                                    />
                                    <span className=" text-gray-700 flex justify-between w-48 text-sm">
                                        <p>{plan.range}</p>
                                        <p>{plan.price}</p>
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-gray-300 hover:bg-cyan-400 text-white font-bold py-1 px-4 rounded shadow-2xl"
                    >
                        Subscribe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubscriptionForm;
