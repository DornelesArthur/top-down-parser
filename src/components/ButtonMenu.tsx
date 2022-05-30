import { List } from "phosphor-react";
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";

export function ButtonMenu(){
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 p-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <List size={25} className="left-5"/>
                </Menu.Button>
            </div>
            <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-2 mt-2 w-50 origin-top-right divide-y divide-gray-100 rounded-md bg-brand-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active && 'bg-brand-200'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            <Link to="/">Home</Link>
                        </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active && 'bg-brand-200'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            <Link to="/grammar">Gramática</Link>
                        </button>
                        )}
                    </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}