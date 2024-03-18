import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import jsPDF from 'jspdf';

interface VacationProps {
    id: string;
    title: string;
    description: string;
    location: string;
    participants: string;
    dateAt: string;
}

function Home() {
    // State variables
    const [vacations, setVacations] = useState<VacationProps[]>([]);
    const navigate = useNavigate();

    // Load vacations on component mount
    useEffect(() => {
        loadVacations();
    }, []);

    // Function to load vacations from the server
    async function loadVacations() {
        try {
            const response = await api.get('/getVacations');
            setVacations(response.data);
        } catch (error) {
            console.error('Error loading vacations:', error);
        }
    }

    // Function to handle deletion of a vacation
    async function handleDelete(id: string) {
        try {
            await api.delete('/deleteVacation', {
                params: {
                    id: id,
                }
            });

            // Remove deleted vacation from state
            setVacations(prevVacations => prevVacations.filter(vacation => vacation.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    // Function to handle editing of a vacation
    async function handleEdit(_id: string) {
        try {
            const response = await api.get(`/getVacationById`, {
                params: {
                    id: _id,
                }
            });

            const vacationData = response.data;
            // Redirect to create page with data for editing
            navigate(`/create?&id=${_id}&title=${vacationData.title}&description=${vacationData.description}&location=${vacationData.location}&participants=${vacationData.participants}&dateAt=${vacationData.dateAt}`);
        } catch (error) {
            console.error('Error fetching vacation data:', error);
        }
    }

    // Function to export card content to PDF
    function handleExportToPDF(element: VacationProps) {
        const doc = new jsPDF();
      
        // Configurando estilos:
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        doc.setTextColor(40);
      
        // Cabeçalho:
        doc.text("Vacation Plan", 60, 25, { align: "right" });
      
        // Borda superior:
        doc.line(15, 40, 190, 40);
      
        // Detalhes da viagem:
        doc.text("Title:", 15, 50);
        doc.text(element.title, 40, 50);
        doc.line(15, 60, 190, 60);
      
        doc.text("Description:", 15, 70);
        doc.text(element.description, 40, 70, { maxWidth: 150 });
        doc.line(15, 85, 190, 85);
      
        // Detalhes com bordas:
        const details = [
          { label: "Location:", value: element.location },
          { label: "Participants:", value: element.participants ? element.participants : "no participants" },
          { label: "Date:", value: new Date(element.dateAt).toLocaleString() },
        ];
      
        let y = 100;
        for (const detail of details) {
          doc.text(detail.label, 15, y);
          doc.text(detail.value, 40, y, { maxWidth: 150 });
          doc.line(15, y + 10, 190, y + 10);
          y += 20;
        }
      
        // Borda inferior:
        doc.line(15, y + 5, 190, y + 5);
      
        // Salvando o PDF:
        doc.save(`${element.title}.pdf`);
      }       

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-w-4xl">
                <div className="flex w-full justify-between">
                    <h1 className="text-4xl font-medium text-white pb-10">Vacation Plan</h1>
                    <button className=" bg-gray-300 p-4 h-10 flex items-center rounded-2xl">
                        <Link to="/create" className="font-medium flex items-center">
                            <span>Create plan</span> <i className="material-icons-outlined">add</i>
                        </Link>
                    </button>
                </div>
                <section className="grid gap-4 md:grid-cols-2">
                    {/* Display vacations */}
                    {vacations.map((element) => (
                        <div key={element.id} className="w-full">
                            <article className="bg-white p-2 hover:scale-105 duration-200 rounded-lg">
                                <p><span className="font-medium">Title:</span> {element.title}</p>
                                <p><span className="font-medium">Description:</span> {element.description}</p>
                                <p><span className="font-medium">Location:</span> {element.location}</p>
                                <p><span className="font-medium">Participants:</span> {element.participants ? element.participants : 'no participants'}</p>
                                <p><span className="font-medium">Date:</span> {new Date(element.dateAt).toLocaleString()}</p>
                                <div className="gap-2 flex justify-end">
                                    <button
                                    className="bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg"
                                    onClick={() => handleExportToPDF(element)}
                                    title='export to pdf'
                                    >
                                    <i className="material-icons-outlined text-white">picture_as_pdf</i>
                                    </button>
                                    <button
                                        className="bg-gray-300 w-7 h-7 flex items-center justify-center rounded-lg"
                                        onClick={() => handleEdit(element.id)}
                                    >
                                        <i className="material-icons-outlined">edit</i>
                                    </button>
                                    <button
                                        className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg"
                                        onClick={() => handleDelete(element.id)}
                                    >
                                        <i className="material-icons-outlined text-white">delete</i>
                                    </button>
                                </div>
                            </article>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default Home;
