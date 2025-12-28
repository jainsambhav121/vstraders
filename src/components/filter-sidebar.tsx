
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

type FilterSidebarProps = {
    filters: any;
    setFilters: (filters: any) => void;
    categories: any[];
    uniqueSizes: string[];
}

export default function FilterSidebar({ filters, setFilters, categories, uniqueSizes }: FilterSidebarProps) {

    const handleCategoryChange = (categoryId: string) => {
        setFilters({
            ...filters,
            categories: filters.categories.includes(categoryId)
                ? filters.categories.filter((c: string) => c !== categoryId)
                : [...filters.categories, categoryId],
        });
    };

    const handleSizeChange = (size: string) => {
        setFilters({
            ...filters,
            sizes: filters.sizes.includes(size)
                ? filters.sizes.filter((s: string) => s !== size)
                : [...filters.sizes, size],
        });
    };
    
    const handleRatingChange = (rating: number) => {
        setFilters({
            ...filters,
            ratings: filters.ratings.includes(rating)
                ? filters.ratings.filter((r: number) => r !== rating)
                : [...filters.ratings, rating],
        });
    };
    
    const handleAvailabilityChange = (checked: boolean) => {
        setFilters({ ...filters, availability: checked });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {categories.map(category => (
                        <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cat-${category.id}`}
                                checked={filters.categories.includes(category.slug)}
                                onCheckedChange={() => handleCategoryChange(category.slug)}
                            />
                            <label htmlFor={`cat-${category.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Price Range</CardTitle>
                </CardHeader>
                <CardContent>
                    <Slider
                        min={0}
                        max={10000}
                        step={100}
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>₹{filters.priceRange[0]}</span>
                        <span>₹{filters.priceRange[1]}</span>
                    </div>
                </CardContent>
            </Card>

            {uniqueSizes.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Size</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {uniqueSizes.map(size => (
                            <div key={size} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`size-${size}`}
                                    checked={filters.sizes.includes(size)}
                                    onCheckedChange={() => handleSizeChange(size)}
                                />
                                <label htmlFor={`size-${size}`} className="text-sm font-medium leading-none">
                                    {size}
                                </label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
            
            <Card>
                <CardHeader>
                    <CardTitle>Rating</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center space-x-2">
                             <Checkbox
                                id={`rating-${rating}`}
                                checked={filters.ratings.includes(rating)}
                                onCheckedChange={() => handleRatingChange(rating)}
                            />
                            <label htmlFor={`rating-${rating}`} className="flex items-center text-sm font-medium leading-none">
                                <div className="flex items-center mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground fill-muted'}`} />
                                    ))}
                                </div>
                                & up
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="availability"
                            checked={filters.availability}
                            onCheckedChange={handleAvailabilityChange}
                        />
                        <label htmlFor="availability" className="text-sm font-medium leading-none">
                            In Stock Only
                        </label>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
