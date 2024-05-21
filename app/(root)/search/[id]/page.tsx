"use client";

import { fetchSingleProduct } from "@/lib/actions/product-actions";
import { MdAccessTime } from "react-icons/md";
import { TbCurrencyLari } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliceDescription } from "@/utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Spinner from "@/components/shared/loader/Spinner";
import { convertDate } from "../../../../utils";
import { fetchDropdownContentList } from "@/lib/actions/selectData-actions";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { PayForProducts } from "@/lib/actions/transactions";
import { toast } from "react-toastify";
import { ConfirmationModal } from "@/components/shared/modals/ConfirmationModal";
import { ConfirmationModalContent } from "@/components/shared/modals/content/ConfirmationContent";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isSliced, setIsSliced] = useState(true);
  const [productDetails, setProductDetails] = useState<Product>();
  const [location, setLocation] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refresh-token");

  const {
    data: user,
    isFetching,
    refetch,
  } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchSingleProductDetails = async () => {
      try {
        setIsLoading(true);
        const details = await fetchSingleProduct(params.id);
        const locationData = await fetchDropdownContentList("location");

        setLocation(locationData[details?.location - 1].name);
        setProductDetails(details);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleProductDetails();
  }, []);

  const handleBuyProduct = async () => {
    if (remainingBalance < 0) {
      toast.error(
        `Insufficient balance. You need ${additionalFundsNeeded} Gel more to buy this product.`
      );
      return;
    }

    if (!accessToken || !refreshToken || !productDetails) {
      console.log("Tokens are missing");
      return;
    }

    try {
      setIsLoading(true);
      const status = await PayForProducts({
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
        product: productDetails?.id,
        quantity: productDetails?.quantity,
      });

      if (status === 201) {
        toast.success("Payment method completed successfully!");
      }
    } catch (error) {
      console.log("Error while making payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmationCancel = () => {
    setShowAlertDialog(false);
  };

  const showBuyButton = user?.id !== productDetails?.user;

  const userBalance = user?.balance || 0;
  const productPrice = productDetails?.price || 0;
  const remainingBalance = userBalance - productPrice;
  const additionalFundsNeeded = productPrice - userBalance;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] w-full flex-center">
        <Spinner lg />
      </div>
    );
  }

  return (
    <>
      <section className="wrapper flex flex-col lg:flex-row gap-8 w-full bg-[#f1f3f6] py-10">
        <div className="basis-2/5 shrink-0 bg-white flex flex-col justify-center gap-4 rounded-2xl h-max">
          <div className="w-[320px] mx-auto">
            <Swiper
              mousewheel
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 object-cover">
              {productDetails?.images?.map((image) => (
                <SwiperSlide key={image.id}>
                  <Image
                    src={image.image}
                    alt="product image"
                    width={300}
                    height={350}
                    className="object-cover w-full  h-[300px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="max-w-[390px] h-[130px] pb-4 px-3 mx-auto">
            <Swiper
              spaceBetween={10}
              slidesPerView={
                productDetails?.images.length! < 3
                  ? productDetails?.images.length
                  : 3
              }
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              onSwiper={setThumbsSwiper as any}>
              {productDetails?.images?.map((image) => (
                <SwiperSlide key={image.id}>
                  <Image
                    src={image.image}
                    alt="product image"
                    width={120}
                    height={100}
                    className="rounded-2xl object-cover max-w-[120px] h-[100px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <article className="flex-1 flex flex-col justify-between lg:justify-start gap-4 bg-white rounded-2xl p-6 relative">
          <div className="w-full flex flex-wrap gap-8 text-lg font-semibold relative">
            <p className="flex gap-2 items-center">ID: {productDetails?.id}</p>

            <p className="flex gap-2 items-center">
              <span className="text-gray-500">
                <FaLocationDot />
              </span>
              {location}
            </p>

            <p className="flex gap-2 items-center ml-6">
              <span className="text-gray-500">
                <MdAccessTime />
              </span>
              {convertDate(productDetails?.created_at!)}
            </p>
            <div>
              {productDetails?.quantity || 0 > 0 ? (
                <span className="text-green-500 font-medium text-lg absolute right-0 top-0">
                  In Stock
                </span>
              ) : (
                <span className="text-red-500 font-medium text-lg absolute right-0 top-0">
                  Out Of Stock
                </span>
              )}
            </div>
          </div>

          <div className="text-3xl font-semibold mt-6">
            <h3>{productDetails?.name}</h3>
            <p className="flex items-center gap-1 mt-4">
              {productDetails?.price}
              <span>
                <TbCurrencyLari />
              </span>
            </p>
          </div>

          <div className="w-full h-[1px] bg-gray-500 my-4" />

          {productDetails?.description && (
            <p className="flex flex-col gap-10 justify-start text-gray-700">
              {sliceDescription(productDetails?.description, 300, isSliced)}
              {productDetails?.description.length > 300 && (
                <Button
                  className="text-blue-500 w-max"
                  onClick={() => setIsSliced((prev) => !prev)}>
                  {isSliced ? "Continue reading" : "show less"}
                </Button>
              )}
              {showBuyButton && (
                <Button
                  className="text-white text-base font-bold py-6 bg-[#fec900] rounded-lg absolute right-5 bottom-5"
                  onClick={() => setShowAlertDialog(true)}>
                  Buy Product
                </Button>
              )}
            </p>
          )}
        </article>
      </section>
      <ConfirmationModal
        message={
          <ConfirmationModalContent
            remainingBalance={remainingBalance}
            additionalFundsNeeded={additionalFundsNeeded}
            productDetails={productDetails}
            userBalance={userBalance}
          />
        }
        title="Confirm Purchase"
        onConfirm={handleBuyProduct}
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        isLoading={isLoading}
        onCancel={onConfirmationCancel}
      />
    </>
  );
};

export default ProductDetailsPage;
