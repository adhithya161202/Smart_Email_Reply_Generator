console.log("Email Writer Extension - Content Script Loaded");

function getEmailContent() {

    const selectors = [
        '.gmail_default',
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]',
        '.editable.LW-avf',
        '.editable[tabindex="1"]',
        '.oL.aXjS'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}


function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Genrate AI Reply');
    return button;
}

function findComposeToolbar() {

    const selectors = [
        '.aDh',
        '.btC',
        '[role="toolbar"]',
        'gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();
    const toolbar = findComposeToolbar();

    if (!toolbar) {
        console.log("toolbar not found");
        return;
    }
    console.log("toolbar found,creating AI Reply button");
    const button = createAIButton();

    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "Professional",
                })
            });
            if (!response.ok) {
                throw new Error('API request failed ');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                composeBox.innerHTML = '';
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error("Compose box not found");
            }


        } catch (error) {
            console.error(error);
            alert("Error generating AI reply");
        }

        finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);

}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNotes = Array.from(mutation.addedNodes);
        const hasComposedEelements = addedNotes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && (node.matches('.aDh .btC, [role="dialog"]') || node.querySelector('.aDh , .btC, [role="dialog"]'))
        );

        if (hasComposedEelements) {
            console.log("Compose window detected");
            setTimeout(injectButton, 500);


        }

    }

});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
