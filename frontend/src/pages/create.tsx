import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';

interface VacationProps {
  id: string;
  title: string;
  description: string;
  location: string;
  participants: string;
  dateAt: string;
}

function Create() {
  // Refs for form inputs
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const participantsRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  // Get current location
  const location = useLocation();

  // State variables
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setValid] = useState(true);
  const [itemId, setItemId] = useState<string | null>(null);

  useEffect(() => {
    // Parse query params from URL
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');

    // If all required params exist, set editing mode and populate form fields
    if (idParam) {
      setIsEditing(true);
      setItemId(idParam);

      // Populate form fields with query params
      titleRef.current!.value = params.get('title') || '';
      descriptionRef.current!.value = params.get('description') || '';
      locationRef.current!.value = params.get('location') || '';
      participantsRef.current!.value = params.get('participants') || '';
      dateRef.current!.value = (params.get('dateAt') ? new Date(params.get('dateAt')!).toISOString().slice(0, 16) : '');
    }
  }, [location]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Check if required fields are filled
    let isValidForm = true;

    if (!titleRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo title preenchido, válido
    }

    if (!descriptionRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo description preenchido, válido
    }

    if (!locationRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo location preenchido, válido
    }

    if (!dateRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo date preenchido, válido
    }

    if (!isValidForm) {
      return;
    }

    // Format date value
    const dateValue = dateRef.current?.value ? new Date(dateRef.current.value).toISOString() : '';

    try {
      // Send POST request to create vacation plan
      const response = await api.post('/postVacation', {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        location: locationRef.current?.value,
        participants: participantsRef.current?.value,
        dateAt: dateValue,
      });

      // Redirect to home on successful creation
      if (response.status === 200) {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error("Error occurred while creating vacation plan:", error);
    }
  }



  async function handleSubmitUpdate(event: FormEvent, _id: string ) {
    event.preventDefault();

    // Check if required fields are filled and ID is provided
    let isValidForm = true;

    if (!titleRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo title preenchido, válido
    }

    if (!descriptionRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo description preenchido, válido
    }

    if (!locationRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo location preenchido, válido
    }

    if (!dateRef.current?.value) {
      setValid(false);
      isValidForm = false;
    } else {
      setValid(true); // Campo date preenchido, válido
    }

    if (!isValidForm) {
      return;
    }

    // Format date value
    const dateValue = dateRef.current?.value ? new Date(dateRef.current.value).toISOString() : '';

    try {
      // Send PUT request to update vacation plan
      const response = await api.put('/updateVacation', {
        id: _id,
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        location: locationRef.current?.value,
        participants: participantsRef.current?.value,
        dateAt: dateValue
      });

      // Redirect to home on successful update
      if (response.status === 200) {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error("Error occurred while updating vacation plan:", error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-4xl">
        <div className="flex w-full justify-between">
          <h1 className="text-4xl font-medium text-white pb-10">{isEditing ? 'Edit Plan' : 'Create Plan'}</h1>
          <button className=" bg-gray-300 p-4 h-10 flex items-center rounded-2xl">
              <Link to="/home" className="font-medium flex items-center">
                <i className="material-icons-outlined">arrow_back</i><span>Back</span>
              </Link>
          </button>
        </div>
        <form className="flex flex-col my-6" onSubmit={(event) => isEditing ? handleSubmitUpdate(event, itemId!) : handleSubmit(event)}>
          {/* Grid container */}
          <div className="grid grid-cols-2 gap-4">
            {/* Title input */}
            <div className="flex flex-col col-span-full">
              <label className="font-medium text-white">Title:</label>
              <input
                type="text"
                placeholder="Enter the title"
                className={`w-full p-2 rounded-lg ${!isValid && !titleRef.current?.value && 'border bg-red-100 border-red-500'}`}
                ref={titleRef}
                onChange={() => setValid(titleRef.current?.value.trim() !== '')} 
              />
              {!isValid && !titleRef.current?.value && (
                <span className="text-red-500 text-sm mt-1">Required field</span>
              )}
            </div>
            {/* Description input */}
            <div className="flex flex-col">
              <label className="font-medium text-white">Description:</label>
              <input
                type="text"
                placeholder="Enter the description"
                className={`w-full p-2 rounded-lg ${!isValid && !descriptionRef.current?.value && 'border bg-red-100 border-red-500'}`}
                ref={descriptionRef}
                onChange={() => setValid(descriptionRef.current?.value.trim() !== '')} 
              />
               {!isValid && !descriptionRef.current?.value && (
                <span className="text-red-500 text-sm mt-1">Required field</span>
              )}
            </div>
            {/* Location input */}
            <div className="flex flex-col">
              <label className="font-medium text-white">Location:</label>
              <input
                type="text"
                placeholder="Enter the location"
                className={`w-full p-2 rounded-lg ${!isValid && !locationRef.current?.value && 'border bg-red-100 border-red-500'}`}
                ref={locationRef}
                onChange={() => setValid(locationRef.current?.value.trim() !== '')} 
              />
               {!isValid && !locationRef.current?.value && (
                <span className="text-red-500 text-sm mt-1">Required field</span>
              )}
            </div>
            {/* Participants input */}
            <div className="flex flex-col">
              <label className="font-medium text-white">Participants:</label>
              <input
                type="text"
                placeholder="Enter the participants"
                className="w-full p-2 rounded-lg"
                ref={participantsRef}
              />
            </div>
            {/* Date input */}
            <div className="flex flex-col">
              <label className="font-medium text-white">Date:</label>
              <input
                  type="datetime-local"
                  placeholder="Enter the date"
                  className={`w-full p-2 rounded-lg ${!isValid && !dateRef.current?.value && 'border bg-red-100 border-red-500'}`}
                  ref={dateRef}
                  onChange={() => setValid(dateRef.current?.value !== '')} // Verifica se o valor do campo de data não está vazio
              />
              {!isValid && !dateRef.current?.value && (
                  <span className="text-red-500 text-sm mt-1">Required field</span>
              )}
          </div>
          </div>

          {/* Submit button */}
          <input
            type="submit"
            value={isEditing ? 'Update Plan' : 'Create Plan'}
            className="cursor-pointer rounded-3xl w-full p-2 mt-6 bg-green-500 font-medium"
          />
        </form>
      </main>
    </div>
  );
}

export default Create;
