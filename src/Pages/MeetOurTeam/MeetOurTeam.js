import React from 'react';

const MeetOurTeam = () => {
    const teamMembers = [
        { name: 'Amit Rahman', title: 'Chairman', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Sabrina Khan', title: 'Managing Director', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
        { name: 'Rashedul Islam', title: 'Director Counseling', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
        { name: 'Tania Begum', title: 'Director Finance', image: 'https://randomuser.me/api/portraits/women/12.jpg' }
    ];

    const doctors = [
        { name: 'Dr. Farhana Ahmed', title: 'Doctor', image: 'https://randomuser.me/api/portraits/women/13.jpg' },
        { name: 'Dr. Rezaul Karim', title: 'Doctor', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
        { name: 'Dr. Nusrat Jahan', title: 'Doctor', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
        { name: 'Dr. Arif Chowdhury', title: 'Doctor', image: 'https://randomuser.me/api/portraits/men/14.jpg' },
        { name: 'Dr. Selina Begum', title: 'Doctor', image: 'https://randomuser.me/api/portraits/women/15.jpg' },
        { name: 'Dr. Imran Hossain', title: 'Doctor', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
        { name: 'Dr. Khadija Sultana', title: 'Doctor', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
        { name: 'Dr. Shahidul Alam', title: 'Doctor', image: 'https://randomuser.me/api/portraits/men/16.jpg' },
        { name: 'Dr. Sultana Akhter', title: 'Doctor', image: 'https://randomuser.me/api/portraits/women/17.jpg' }
    ];

    const staff = [
        { name: 'Mohammad Anwar', title: 'Staff Member', image: 'https://randomuser.me/api/portraits/men/17.jpg' },
        { name: 'Jahanara Begum', title: 'Staff Member', image: 'https://randomuser.me/api/portraits/women/18.jpg' },
        { name: 'Rafiqul Islam', title: 'Staff Member', image: 'https://randomuser.me/api/portraits/men/18.jpg' },
        { name: 'Moumita Das', title: 'Staff Member', image: 'https://randomuser.me/api/portraits/women/19.jpg' }
    ];

    return (
        <div className='w-full max-w-7xl mx-auto px-5 py-10'>
            {/* Our Team */}
            <h2 className='mb-16 text-3xl font-semibold text-primary text-center'>Our Team</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
                {teamMembers.map((member, index) => (
                    <div key={index} className='text-center'>
                        <img className='w-32 h-32 rounded-md mx-auto' src={member.image} alt={member.name} />
                        <h3 className='mt-4 text-xl font-semibold'>{member.name}</h3>
                        <p className='text-lg'>{member.title}</p>
                    </div>
                ))}
            </div>

            {/* Doctors */}
            <h2 className='mb-16 text-3xl font-semibold text-primary text-center'>Our Doctors</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
                {doctors.map((doctor, index) => (
                    <div key={index} className='text-center'>
                        <img className='w-32 h-32 rounded-md mx-auto' src={doctor.image} alt={doctor.name} />
                        <h3 className='mt-4 text-xl font-semibold'>{doctor.name}</h3>
                        <p className='text-lg'>{doctor.title}</p>
                    </div>
                ))}
            </div>

            {/* Staff Members */}
            <h2 className='mb-16 text-3xl font-semibold text-primary text-center'>Company Staff</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                {staff.map((member, index) => (
                    <div key={index} className='text-center'>
                        <img className='w-32 h-32 rounded-md mx-auto' src={member.image} alt={member.name} />
                        <h3 className='mt-4 text-xl font-semibold'>{member.name}</h3>
                        <p className='text-lg'>{member.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeetOurTeam;
