import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import LocationSearch from './LocationSearch';

export interface TravelFormProps {
  onSubmit: (values: {
    destination: string;
    startDate: Date;
    endDate: Date;
    travelStyle: string;
    activities: string;
  }) => void;
  isLoading?: boolean;
  initialDestination?: string;
}

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Please enter a valid destination",
  }),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date({
    required_error: "Please select an end date",
  }),
  travelStyle: z.enum(["budget", "mid-range", "luxury"], {
    required_error: "Please select a travel style",
  }),
  activities: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading = false, initialDestination = "" }) => {
  const [destination, setDestination] = useState(initialDestination);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: initialDestination,
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      travelStyle: "mid-range",
      activities: "",
    },
  });

  useEffect(() => {
    if (initialDestination && initialDestination !== form.getValues("destination")) {
      form.setValue("destination", initialDestination);
      setDestination(initialDestination);
    }
  }, [initialDestination, form]);

  function handleFormSubmit(values: FormValues) {
    onSubmit({
      destination: values.destination,
      startDate: values.startDate,
      endDate: values.endDate,
      travelStyle: values.travelStyle,
      activities: values.activities || ""
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where would you like to go?</FormLabel>
              <FormControl>
                <LocationSearch
                  value={destination}
                  onChange={(value) => {
                    setDestination(value);
                    field.onChange(value);
                  }}
                  placeholder="Search for a location in Georgia..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3.5 font-normal text-left",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3.5 font-normal text-left",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || (form.getValues("startDate") && date < form.getValues("startDate"))
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="travelStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel Style</FormLabel>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="budget" id="budget" />
                  </FormControl>
                  <FormLabel htmlFor="budget">Budget</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mid-range" id="mid-range" />
                  </FormControl>
                  <FormLabel htmlFor="mid-range">Mid-Range</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="luxury" id="luxury" />
                  </FormControl>
                  <FormLabel htmlFor="luxury">Luxury</FormLabel>
                </FormItem>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What activities are you interested in?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Hiking, Wine Tasting, Historical Sites"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                Generating Itinerary...
              </>
            ) : (
              "Create My Itinerary"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TravelForm;
