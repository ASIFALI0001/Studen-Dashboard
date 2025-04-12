   // Get stored subjects or use example data
   let subjects = JSON.parse(localStorage.getItem('studentSubjects')) || [];
    
   // Example attendance data
   const existingAttendance = [
     { 
       subject: "Mathematics", 
       percentage: 85, 
       color: "#4CAF50",
       records: [
         { date: "Apr 10, 2025", status: "present" },
         { date: "Apr 8, 2025", status: "present" },
         { date: "Apr 5, 2025", status: "absent" },
         { date: "Apr 3, 2025", status: "present" },
         { date: "Apr 1, 2025", status: "present" },
         { date: "Mar 29, 2025", status: "present" },
         { date: "Mar 27, 2025", status: "present" },
         { date: "Mar 24, 2025", status: "present" },
         { date: "Mar 22, 2025", status: "absent" },
         { date: "Mar 20, 2025", status: "present" }
       ]
     },
     { 
       subject: "Data Structures", 
       percentage: 92, 
       color: "#2196F3",
       records: [
         { date: "Apr 9, 2025", status: "present" },
         { date: "Apr 7, 2025", status: "present" },
         { date: "Apr 4, 2025", status: "present" },
         { date: "Apr 2, 2025", status: "present" },
         { date: "Mar 31, 2025", status: "present" },
         { date: "Mar 28, 2025", status: "present" },
         { date: "Mar 26, 2025", status: "absent" },
         { date: "Mar 24, 2025", status: "present" },
         { date: "Mar 21, 2025", status: "present" },
         { date: "Mar 19, 2025", status: "present" }
       ]
     },
     { 
       subject: "Operating Systems", 
       percentage: 78, 
       color: "#FF9800",
       records: [
         { date: "Apr 10, 2025", status: "absent" },
         { date: "Apr 8, 2025", status: "present" },
         { date: "Apr 6, 2025", status: "present" },
         { date: "Apr 4, 2025", status: "absent" },
         { date: "Apr 2, 2025", status: "present" },
         { date: "Mar 31, 2025", status: "present" },
         { date: "Mar 29, 2025", status: "present" },
         { date: "Mar 27, 2025", status: "absent" },
         { date: "Mar 25, 2025", status: "present" },
         { date: "Mar 23, 2025", status: "present" }
       ]
     },
     { 
       subject: "Web Development", 
       percentage: 88, 
       color: "#9C27B0",
       records: [
         { date: "Apr 9, 2025", status: "present" },
         { date: "Apr 7, 2025", status: "present" },
         { date: "Apr 5, 2025", status: "present" },
         { date: "Apr 3, 2025", status: "absent" },
         { date: "Apr 1, 2025", status: "present" },
         { date: "Mar 30, 2025", status: "present" },
         { date: "Mar 28, 2025", status: "present" },
         { date: "Mar 26, 2025", status: "present" },
         { date: "Mar 24, 2025", status: "present" },
         { date: "Mar 22, 2025", status: "absent" }
       ]
     }
   ];
   
   // Function to generate random color
   function getRandomColor() {
     const colors = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#009688"];
     return colors[Math.floor(Math.random() * colors.length)];
   }
   
   // Display subjects and attendance on page load
   window.addEventListener('DOMContentLoaded', function() {
     displaySubjects();
   });
   
   // Find subject attendance data or create new empty records
   function getSubjectAttendance(subjectName) {
     // Check if attendance exists for this subject in our example data
     const existingSubject = existingAttendance.find(s => s.subject === subjectName);
     if (existingSubject) {
       return existingSubject;
     }
     
     // Create new empty attendance data for custom subjects
     return {
       subject: subjectName,
       percentage: 0,
       color: getRandomColor(),
       records: []
     };
   }
   
   // Open attendance modal
   function showAttendanceDetails(subject) {
     // Get attendance data
     const attendanceData = getSubjectAttendance(subject.name);
     
     // Set modal title and statistics
     document.getElementById('modalSubjectTitle').textContent = `${subject.name} Attendance`;
     document.getElementById('totalClasses').textContent = attendanceData.records.length;
     
     const attendedClasses = attendanceData.records.filter(record => record.status === 'present').length;
     document.getElementById('attendedClasses').textContent = attendedClasses;
     document.getElementById('percentageDisplay').textContent = `${attendanceData.percentage}%`;
     
     // Populate attendance records
     const detailsContainer = document.getElementById('attendanceDetails');
     detailsContainer.innerHTML = '';
     
     if (attendanceData.records.length === 0) {
       detailsContainer.innerHTML = '<p style="text-align: center; color: #888;">No attendance records yet.</p>';
     } else {
       attendanceData.records.forEach(record => {
         const recordElement = document.createElement('div');
         recordElement.className = `attendance-date ${record.status}`;
         
         recordElement.innerHTML = `
           <span>${record.date}</span>
           <span>${record.status === 'present' ? '✅ Present' : '❌ Absent'}</span>
         `;
         
         detailsContainer.appendChild(recordElement);
       });
     }
     
     // Show modal
     document.getElementById('attendanceModal').classList.add('active');
   }
   
   // Close attendance modal
   function closeModal() {
     document.getElementById('attendanceModal').classList.remove('active');
   }
   
   // Open add subject modal
   function openAddSubjectModal() {
     document.getElementById('addSubjectModal').classList.add('active');
     document.getElementById('add-subject-form').reset();
   }
   
   // Close add subject modal
   function closeAddSubjectModal() {
     document.getElementById('addSubjectModal').classList.remove('active');
   }
   
   // Close modal when clicking outside the content
   document.getElementById('attendanceModal').addEventListener('click', function(event) {
     if (event.target === this) {
       closeModal();
     }
   });
   
   document.getElementById('addSubjectModal').addEventListener('click', function(event) {
     if (event.target === this) {
       closeAddSubjectModal();
     }
   });
   
   // Form submission handler for adding subjects
   document.getElementById('add-subject-form').addEventListener('submit', function(e) {
     e.preventDefault();
     
     const newSubject = {
       name: document.getElementById('subject-name').value,
       time: document.getElementById('class-time').value,
       classroom: document.getElementById('classroom').value,
       days: document.getElementById('class-days').value,
       professor: document.getElementById('professor-name').value,
       credits: document.getElementById('credits').value
     };
     
     // Add to subjects array
     subjects.push(newSubject);
     
     // Save to localStorage
     localStorage.setItem('studentSubjects', JSON.stringify(subjects));
     
     // Update display
     displaySubjects();
     
     // Close modal
     closeAddSubjectModal();
     
     // Show success message
     const statusMessage = document.getElementById('status-message');
     statusMessage.textContent = '✅ Subject added successfully!';
     statusMessage.className = 'message success';
     setTimeout(() => {
       statusMessage.textContent = '';
     }, 3000);
   });
   
   // Function to display subjects with attendance
   function displaySubjects() {
     const subjectsContainer = document.getElementById('subjects-container');
     
     if (!subjectsContainer) return;
     
     // Combine existing attendance subjects and custom subjects
     const allSubjects = [
       ...existingAttendance,
       ...subjects.filter(s => !existingAttendance.some(e => e.subject === s.name)).map(s => {
         return {
           subject: s.name,
           percentage: 0,
           color: getRandomColor(),
           records: [],
           // Add custom subject details
           time: s.time,
           classroom: s.classroom,
           days: s.days,
           professor: s.professor,
           credits: s.credits
         };
       })
     ];
     
     if (allSubjects.length === 0) {
       subjectsContainer.innerHTML = `
         <div class="no-subjects-message">
           <p>You haven't added any subjects yet.</p>
           <p>Click the "Add Subject" button to get started.</p>
         </div>
       `;
       return;
     }
     
     subjectsContainer.innerHTML = '';
     
     allSubjects.forEach(subject => {
       const card = document.createElement('div');
       card.className = 'subject-display-card';
       
       // Find custom subject details if available
       const customSubject = subjects.find(s => s.name === subject.subject);
       
       // Create card content
       let cardContent = `
         <div class="subject-header">
           <h3 class="subject-title">
             ${subject.subject}
             <span class="credit-badge">${customSubject ? customSubject.credits : '3'} Credits</span>
           </h3>
         </div>
         <div class="subject-body">
       `;
       
       // Add custom subject details if available
       if (customSubject) {
         cardContent += `
           <div class="subject-detail">
             <span class="detail-label">Professor:</span>
             <span class="detail-value">${customSubject.professor}</span>
           </div>
           <div class="subject-detail">
             <span class="detail-label">Schedule:</span>
             <span class="detail-value">${customSubject.days}</span>
           </div>
           <div class="subject-detail">
             <span class="detail-label">Time:</span>
             <span class="detail-value">${customSubject.time}</span>
           </div>
           <div class="subject-detail">
             <span class="detail-label">Classroom:</span>
             <span class="detail-value">${customSubject.classroom}</span>
           </div>
         `;
       }
       
       // Add attendance bar
       cardContent += `
           <div class="attendance-label" style="margin-top: 15px;">
             <span>Attendance</span>
             <span>${subject.percentage}%</span>
           </div>
           <div class="attendance-bar">
             <div class="attendance-progress" style="width:0%; background-color:${subject.color}"></div>
           </div>
         </div>
       `;
       
       card.innerHTML = cardContent;
       subjectsContainer.appendChild(card);
       
       // Add click event to show attendance details
       card.addEventListener('click', () => {
         // Create subject object from data
         const subjectObject = {
           name: subject.subject,
           ...(customSubject || {})
         };
         showAttendanceDetails(subjectObject);
       });
       
       // Animate the progress bars
       setTimeout(() => {
         card.querySelector('.attendance-progress').style.width = `${subject.percentage}%`;
       }, 100);
     });
   }
   
   function markAttendance() {
     const success = Math.random() > 0.5;
     const message = document.getElementById('status-message');
     const issueForm = document.getElementById('issue-form');
           
     if (success) {
       message.textContent = '✅ Attendance marked successfully!';
       message.className = 'message success';
       issueForm.style.display = 'none';
     } else {
       message.textContent = '❌ Face ID verification failed!';
       message.className = 'message fail';
       issueForm.style.display = 'block';
     }
   }
   
   function submitReport() {
     const text = document.getElementById('issue-text').value;
     if (text.trim()) {
       alert('Issue reported to teacher: ' + text);
       document.getElementById('issue-text').value = '';
       document.getElementById('issue-form').style.display = 'none';
       document.getElementById('status-message').textContent = '';
     }
   }
   
   function cancelReport() {
     document.getElementById('issue-text').value = '';
     document.getElementById('issue-form').style.display = 'none';
     document.getElementById('status-message').textContent = '';
   }