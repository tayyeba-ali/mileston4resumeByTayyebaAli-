//listing element
document.getElementById('resumeForm')?.addEventListener('submit', function(event){
    event.preventDefault();

    //Get reference to form elements using their IDs:
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement; 


    ///type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    
    
    if( profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement){

        const name = nameElement.value; 
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillsElement.value;

        //picture elements
        const profilePictureFile = profilePictureInput.files?.[0]
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
    

   //Create resume output
   const resumeOutput =`
   <h2>Resume</h2>
   ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
   <p><strong>Name :</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
   <p><strong>Email :</strong> <span id="edit-edit" class="editable">${email} </span></p>
   <p><strong>Phone Number :</strong> <span id="edit-phone" class="editable">${phone} </span></p>
   <p><strong>Address :</strong> <span id="edit-address" class="editable">${address} </span></p>

   
   <h3>Education:</h3>
   <p id="edit-education" class="editable">${education}</p>

   <h3> Work Experience:</h3>
   <p id="edit-experience" class="editable">${experience}</p>

   <h3>Skills:</h3>
   <p id="edit-skills" class="editable">${skill}</p>
   `;

 //Display the resume output
    const resumeOutputElement = document.getElementById('resumeOutput')
    if (resumeOutputElement){
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable();
    }
 }else{
    console.error(`one or more output elements are missing`)
 }

})


function makeEditable(){
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click' , function(){
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "" ;

            //replace content
            if(currentElement.tagName === "p" || currentElement.tagName === 'SPAN'){
                const input =document.createElement('input')
                input.type = 'text'
                input.value = currentValue
                input.classList.add('editing-input')

                input.addEventListener('blur', function(){
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline'
                    input.remove()
                })

                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
        })
    });
}