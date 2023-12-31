import { productTableHeaders } from "@/utils/config";
import Table from "../Table";
import moment from "moment";

async function extractAllProducts() {
  const res = await fetch("http://localhost:3000/api/product/all-products", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}

export default async function ProductListing() {
  const allProducts = await extractAllProducts();

  const filteredProducts = allProducts.data.reduce(
    (acc, product) =>
      acc.some((p) => p.id === product.id) ? acc : [...acc, product],
    []
  );


  console.log(filteredProducts);
  return (
    <Table
      tableHeaderText="All Products Overview"
      tableHeaderCells={productTableHeaders}
      data={
        filteredProducts &&
        filteredProducts.length
          ? filteredProducts.map((item) => ({
              ...item,
              type: item.type.label,
              idType: item.type.idType,
              time: moment(item.time).format("DD/MM/YYYY - HH:mm:ss"),
            }))
          : []
      }
    />
  );
}
