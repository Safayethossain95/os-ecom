export const fileUploadController = (req, res) => {
    // Check if files were uploaded
    if ( !req.files.avatar || !req.files.doc) {
        return res.status(400).json({ message: 'One upload successful.' });
    }

    // File upload success
    res.json({
        message: 'File upload successful',
        avatar: req.files.avatar[0].filename, // Get uploaded avatar filename
        doc: req.files.doc[0].filename        // Get uploaded document filename
    });
};