import React from 'react';

const MeetOurTeam = () => {
    const boardOfDirectors = [
        { name: 'Amit Rahman', title: 'Chairman', image: 'https://i.postimg.cc/PfK3NYTy/Chairman2.png   ' },
        { name: 'Sabrina Khan', title: 'Managing Director', image: 'https://i.postimg.cc/fbtnf5TM/12.jpg' },
        { name: 'Rashedul Islam', title: 'Director Counseling', image: 'https://i.postimg.cc/xjP7HByK/5.jpg' },
        { name: 'Tania Begum', title: 'Director Finance', image: 'https://i.postimg.cc/RVMkDvVs/19.jpg' }
    ];

    const doctors = [
        { name: 'Dr. Farhana Ahmed', title: 'Addiction Professional (International Certified)', image: 'https://i.postimg.cc/vTyJMs7m/15.jpg' },
        { name: 'Dr. Rezaul Karim', title: 'Psychiatrist (Asst. Professor)', image: 'https://i.postimg.cc/ZnjMSyKf/1.jpg' },
        { name: 'Dr. Nusrat Jahan', title: 'Addiction Professional (International Certified)', image: 'https://i.postimg.cc/G2GWZ2yN/14.jpg' },
        { name: 'Dr. Arif Chowdhury', title: 'Psychiatrist (Asst. Professor)', image: 'https://i.postimg.cc/T3BHfxfX/10.jpg' },
        { name: 'Dr. Selina Begum', title: 'Addiction Professional (International Certified)', image: 'https://i.postimg.cc/L4BdDJRg/17.jpg' },
        { name: 'Dr. Imran Hossain', title: 'Psychiatrist (Asst. Professor)', image: 'https://i.postimg.cc/hjWwbB50/3.jpg' },
        { name: 'Dr. Khadija Sultana', title: 'Addiction Professional (International Certified)', image: 'https://i.postimg.cc/GmtZbzDv/20.jpg' },
        { name: 'Dr. Shahidul Alam', title: 'Psychiatrist (Asst. Professor)', image: 'https://i.postimg.cc/65jmbRPq/8.jpg' },
        { name: 'Dr. Sultana Akhter', title: 'Addiction Professional (International Certified)', image: 'https://i.postimg.cc/13dbX602/21.jpg' }
    ];

    const staff = [
        { name: 'Mohammad Anwar', title: 'Counselor', image: 'https://i.postimg.cc/hGxZGYtQ/9.jpg' },
        { name: 'Jahanara Begum', title: 'Nurse', image: 'https://i.postimg.cc/Hntfkh39/16.jpg' },
        { name: 'Rafiqul Islam', title: 'Therapist', image: 'https://i.postimg.cc/hGxZGYtQ/9.jpg' },
        { name: 'Moumita Das', title: 'Administrative Staff', image: 'https://i.postimg.cc/zGPYh4Nd/12.webp' }
    ];

    return (
        <div className='w-full max-w-7xl mx-auto px-5 py-10'>
            {/* Board of Directors */}
            <h1 className='mb-16 text-4xl font-semibold text-primary text-center'>Our Teams</h1>
            <h2 className='mb-16 text-2xl font-semibold text-primary text-center'>Board of Directors</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
                {boardOfDirectors.map((member, index) => (
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

            {/* Company Staff */}
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
