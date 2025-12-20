import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Card from '../../components/Home/Card';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Container from '../../components/Shared/Container';

const AllMeals = () => {
 const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", order: "" });

  const { data: meals = [], isLoading, error } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });

  // Handle Loading and Error states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500">Error loading meals!</div>;

  // 1. Filter Logic: Safeguard against missing foodName
  const filteredMeals = meals.filter((meal) =>
    meal?.foodName?.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Sorting Logic: Fixed to handle numbers correctly
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (!sortConfig.key) return 0;

    // Ensure we are comparing numbers, default to 0 if missing
    const valA = Number(a[sortConfig.key]) || 0;
    const valB = Number(b[sortConfig.key]) || 0;

    if (sortConfig.order === "asc") {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });

  return (
    <Container>
      {/* UI Controls */}
      <div className="pt-10 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by meal name..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none shadow-sm transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>

        {/* Sorting Dropdown */}
        <div className="w-full md:w-auto">
          <select 
            onChange={(e) => {
              if (e.target.value === "") {
                setSortConfig({ key: "", order: "" });
              } else {
                const [key, order] = e.target.value.split("-");
                setSortConfig({ key, order });
              }
            }}
            className="w-full md:w-auto bg-white border border-gray-200 px-4 py-3 rounded-xl font-bold text-gray-700 outline-none focus:border-amber-500 cursor-pointer shadow-sm"
          >
            <option value="">Sort By: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {sortedMeals.length > 0 ? (
        <div className="pt-8 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {sortedMeals.map((meal) => (
            <Card key={meal._id} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-400">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold">No results found</h3>
        </div>
      )}
    </Container>
  );
};

export default AllMeals;