import type React from "react";
import type { CreateOrderItem, createOrderPayload } from "../../../api/orders/types/orders";
import { useState, type Dispatch, type SetStateAction } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { getDetailValue } from "./utils";




interface Props {
    payload: createOrderPayload;
    setPayload: Dispatch<SetStateAction<createOrderPayload>>;
    categoryId: string;
}

function CakeItem(
    {
        categoryId,
        payload,
        setPayload,
    } : Props
) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleRemoveItem = (index: number) => {

        setPayload((prev) => ({
            ...prev,
            items: prev.items.filter((_, itemIndex) => itemIndex !== index),
        }))
    }

    return (
        <div
            className="w-full flex flex-col gap-4 items-start p-6 rounded-xs bg-white bf-shadow">

            <div
                className="w-full flex items-center justify-between">

                <div
                    className="flex items-center gap-2">

                    <img 
                        src="/src/assets/OrderItemIcon.svg" 
                        alt="" 
                    />
                    
                    <h3
                        className="font-bold text-[16px]/[24px] tracking-[-0.4px] text-bf-primaryblack">
                        CAKES
                    </h3>

                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();

                        setIsOpen(true);
                    }}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-md bg-[#F4ECE8] cursor-pointer">

                    <img 
                        src="/src/assets/AddRoundColorIcon.svg" 
                        alt="" 
                    />

                    <p
                        className="font-semibold text-[12px]/[16px] tracking-[0.12px] text-bf-primaryblack">
                        Add Cake Item
                    </p>

                </button>

            </div>

            {
                payload.items.filter(item => item.categoryId === categoryId).length !== 0 && (

                    <div
                        className="w-full flex flex-col items-start gap-2">

                        {
                            payload.items.filter(item => item.categoryId === categoryId).map((item, index) => (

                                <ConfiguredCakeItem 
                                    key={index}
                                    item={item}
                                    removeItem={() => handleRemoveItem(index)}
                                />
                            ))
                        }
                    </div>
                )
            }

            {
                isOpen && (

                    <AddCakeDetails 
                        setPayload={setPayload}
                        categoryId={categoryId}
                        payload={payload}
                        setIsOpen={setIsOpen}
                    />

                )
            }

        </div>
    )
}



interface CofigureedCakeProps {
    item: CreateOrderItem;
    removeItem: () => void;
}

function ConfiguredCakeItem (
    {
        item,
        removeItem,
    }: CofigureedCakeProps
) {

    return (
        <div
            className="w-full p-2 rounded-sm bg-bf-backgroundTwo bf-shadow flex items-center justify-between">

            <div
                className="flex flex-col gap-0.5 w-sm">

                    <p
                        className="font-semibold text-[13px]/[18px] tracking-[0.12px] text-bf-primaryblack">
                        {item.productName}
                    </p>

                    <ul
                        className="w-full grid grid-cols-2 gap-0.5 font-normal text-[12px]/[16px] text-bf-primarytext">
                            
                        <li>
                            Size: <span className="text-bf-primaryblack">{getDetailValue(item.details, "size")}</span>
                        </li>

                        <li>
                            Layer: <span className="text-bf-primaryblack">{getDetailValue(item.details, "layer")}</span>
                        </li>

                        <li>
                            Flavour: <span className="text-bf-primaryblack">{getDetailValue(item.details, "flavour")}</span>
                        </li>

                        <li>
                            Frosting: <span className="text-bf-primaryblack">{getDetailValue(item.details, "frosting")}</span>
                        </li>

                        <li>
                            Inscription: <span className="text-bf-primary italic">{getDetailValue(item.details, "inscription")}</span>
                        </li>

                        <li>
                            Toppings: <span className="text-bf-primaryblack">{getDetailValue(item.details, "topping")}</span>
                        </li>

                        <li>
                            Toppers: <span className="text-bf-primaryblack">{getDetailValue(item.details, "toppers")}</span>
                        </li>

                        <li>
                            Extra: <span className="text-bf-primaryblack">{getDetailValue(item.details, "extra")}</span>
                        </li>

                    </ul>
            </div>

            <div
                className="flex items-center gap-4">

                <div
                    className="flex flex-col items-end">

                    <p
                        className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytextlight">
                        LINE TOTAL
                    </p>

                    <h3
                        className="font-bold text-[24px]/[28px] tracking-[-0.48px] text-bf-primaryblack">
                        {formatCurrency(item.quantity * item.unitPrice)}
                    </h3>

                </div>

                <div
                    onClick={removeItem}
                    className="p-2 rounded-md flex items-center justify-center cursor-pointer">

                    <img 
                        src="/src/assets/DeleteIcon.svg" 
                        alt="" 
                    />

                </div>

            </div>
        </div>
    )
}



interface AddCakeDetailsProps {
    payload: createOrderPayload;
    setPayload: Dispatch<SetStateAction<createOrderPayload>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    categoryId: string;
}

function AddCakeDetails(
    {
        // payload,
        setPayload,
        categoryId,
        setIsOpen,
    } : AddCakeDetailsProps
) {

    const [cakeItem, setCakeItem] = useState<CreateOrderItem>({
        categoryId: categoryId,
        productName: "",
        quantity: 0,
        unitPrice: 0,
        details: {},
    });

    const handleCakeItemChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;

        setCakeItem((prev) => ({
            ...prev,
            categoryId,
            [name]: name === "quantity" || name === "unitPrice"
                ? Number(value)
                : value,
        }))
    }

    const handleCakeItemDetailsChange = (
        field: string,
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {

        const { value } = e.target;

        setCakeItem((prev) => ({

            ...prev,
            details: {
                ...prev.details,
                [field]: 
                    field === "flavour" || field === "topping" || field === "toppers" || field === "extra"
                        ? value.split(",").map((item) => item.trim()).filter(Boolean)
                        : value,
            }
        }))
    }

    const handleSyncCakeOrder = () => {

        setPayload((prev) => ({

            ...prev,

            items: [...prev.items, cakeItem],
        }));

        setCakeItem(() => ({
            categoryId: categoryId,
            productName: "",
            quantity: 0,
            unitPrice: 0,
            details: {},
        }));

        setIsOpen(false);
    }


    return (
        <div
            className="w-full bg-bf-backgroundTwo p-4 rounded-sm bf-shadow">

            <div 
                className="w-full flex flex-col gap-4">

                    <div
                        className="w-full flex flex-col gap-1">

                        <label 
                            htmlFor=""
                            className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                Product Name
                        </label>

                        <div
                            className="p-2 rounded-xs bg-white bf-shadow">
                            <input 
                                type="text"
                                name="productName"
                                value={cakeItem.productName}
                                onChange={(e) => handleCakeItemChange(e)} 
                                className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none"
                            />
                        </div>

                    </div>

                    <div
                        className="grid grid-cols-3 gap-4">

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Size & Structure
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "size")}
                                    onChange={(e) => handleCakeItemDetailsChange("size", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>
                        

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Flavour
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "flavour")}
                                    onChange={(e) => handleCakeItemDetailsChange("flavour", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Layer
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "layer")}
                                    onChange={(e) => handleCakeItemDetailsChange("layer", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Frosting
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "frosting")}
                                    onChange={(e) => handleCakeItemDetailsChange("frosting", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Toppings
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "topping")}
                                    onChange={(e) => handleCakeItemDetailsChange("topping", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Toppers
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "toppers")}
                                    onChange={(e) => handleCakeItemDetailsChange("toppers", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Cake Inscription
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "inscription")}
                                    onChange={(e) => handleCakeItemDetailsChange("inscription", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Extra
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="text"
                                    value={getDetailValue(cakeItem.details, "extra")}
                                    onChange={(e) => handleCakeItemDetailsChange("extra", e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                    </div>

                    <div
                        className="w-full flex items-center gap-4">

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Quantity
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    value={cakeItem.quantity}
                                    onChange={(e) => handleCakeItemChange(e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none"
                                />
                            </div>

                        </div>

                        <div
                            className="w-full flex flex-col gap-1">

                            <label 
                                htmlFor=""
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-primarytext">
                                    Unit Price (NGN)
                            </label>

                            <div
                                className="p-2 rounded-xs bg-white bf-shadow">
                                <input 
                                    type="number"
                                    name="unitPrice"
                                    value={cakeItem.unitPrice}
                                    onChange={(e) => handleCakeItemChange(e)}
                                    className="w-full font-normal text-[13px]/[18px] text-bf-primaryblack cursor-pointer outline-none" 
                                />
                            </div>

                        </div>

                    </div>

                    <div
                        className="w-full flex items-center justify-end">

                        <button
                            className="flex items-center gap-1 px-2 py-1 rounded-xs cursor-pointer"
                            onClick={(e) => {

                                e.preventDefault();
                                handleSyncCakeOrder();
                                // console.log(payload);
                                // console.log(categoryId);
                            }}>
                            
                            <img 
                                src="/src/assets/SuccessTickIcon.svg" 
                                alt=""
                            />

                            <p
                                className="font-semibold text-[11px]/[14px] tracking-[0.22px] text-bf-success">
                                Enter Item
                            </p>
                        </button>

                    </div>

            </div>

        </div>
    )
}

export default CakeItem