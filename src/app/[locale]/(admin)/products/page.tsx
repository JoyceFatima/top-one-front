'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, DeleteModal, Pagination, Status } from '@/components';
import { AddProductModal } from '@/components/molecules/modals/product-modal';
import { toast, useProductsApi } from '@/hooks';
import { IProduct } from '@/interfaces';

export default function Products() {
  const itemsPerPage = 10;

  const { getAll, deleteProduct }   = useProductsApi()
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([])

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getAllProducts = useCallback(async () => {
    const res = await getAll()
    setProducts(res)
  }, [getAll])

  const handleDeleteProduct = useCallback(async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast({
        title: 'Success',
        description: 'Product successfully deleted.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Error when delete product.',
        variant: 'destructive'
      });
    }
  }, [deleteProduct])

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Products" />
        <AddProductModal>
          <Button className="bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800">
            Add New Product
          </Button>
        </AddProductModal>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Discount</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length > 0 ? displayedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">{product.id}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{product.discount}%</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  <Status status={product.isActive ? 'active' : 'inactive'} />
                </td>
                <td className="p-4 flex space-x-2">
                  <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    <DeleteModal handleDelete={() => handleDeleteProduct(product.id)}>
                      <Trash className="w-4 h-4" />
                    </DeleteModal>
                  </button>
                </td>
              </tr>
            )): (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-self-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
