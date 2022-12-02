'use client';

import { useEffect, useState } from 'react';
import { Category, fetchCategoryBySlug, type PageProps } from '#/lib/getCategories';
import { SkeletonCard } from '#/ui/SkeletonCard';

export default function Page({ params }: PageProps) {
  const [clicks, setClicks] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategoryBySlug('electronics').then((category) => {
      if (category) {
        console.log('fetch');
        setCategory(category);
      } else {
        setCategory(null);
      }
    });
  }, []);

  console.log(params);

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-gray-500">
        Oi<br/>
        {
          category ? (
            <div>
              <h1>{category.name}</h1>
            </div>
          ) : (
            <p>Carregando...</p>
          )
        }
        {clicks}<br/>
        <button
          onClick={() => {
            setClicks(clicks + 1);
          }}
        >
          Aumentar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
