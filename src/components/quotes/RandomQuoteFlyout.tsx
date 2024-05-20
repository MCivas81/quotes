import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { BsChatQuote, BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { RandomQuote } from "../../types/Quote";

interface RandomQuoteFlyoutProps {
  isLoading: boolean;
  error: boolean;
  randomQuote: RandomQuote | null;
  handleSaveQuote: (id: string, quote: string, author: string) => void;
  idExists: boolean;
  fetchQuote: () => void;
}

const RandomQuoteFlyout: React.FC<RandomQuoteFlyoutProps> = ({
  isLoading,
  error,
  randomQuote,
  handleSaveQuote,
  idExists,
  fetchQuote,
}) => {
  return (
    <Popover data-testid="random-quote-flyout" className="relative mb-4 flex justify-center">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <div className="flex items-center space-x-2">
          <BsChatQuote className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Quote of the Day</h2>
        </div>
        <FaChevronDown className="h-4 w-4" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="mt-6 w-screen max-w-lg flex-auto overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1 ring-slate-300">
            {isLoading ? (
              <p className="mb-8">Loading quote...</p>
            ) : error ? (
              <div className="mb-8">Ooops...Something went wrong!</div>
            ) : (
              randomQuote && (
                <div className="mb-8 space-y-4">
                  <p className="text-lg italic text-gray-800">{randomQuote.content}</p>
                  <div className="flex items-center justify-between">
                    {randomQuote.author && (
                      <p className="text-md mr-2 text-gray-600">- {randomQuote.author}</p>
                    )}
                    <button
                      className="rounded-full text-slate-600 disabled:text-green-500"
                      onClick={() =>
                        handleSaveQuote(
                          randomQuote._id,
                          randomQuote.content,
                          randomQuote.author || ""
                        )
                      }
                      disabled={idExists}
                    >
                      {idExists ? (
                        <BsCheckCircleFill className="h-6 w-6" />
                      ) : (
                        <BsPlusCircleFill className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              )
            )}
            <button
              className={`btn-primary ${randomQuote ? "w-full sm:!rounded-l-none" : ""}`}
              onClick={fetchQuote}
            >
              New Quote
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default RandomQuoteFlyout;
